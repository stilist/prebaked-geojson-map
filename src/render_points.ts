import {
  Feature,
  FeatureCollection,
  GeometryObject,
  Point,
} from "geojson";
import {
  divIcon,
  geoJSON,
  GeoJSONOptions,
  LatLng,
  Map,
  marker,
  point,
} from "leaflet";
import supercluster, {
  BBox,
  Supercluster,
} from "supercluster";
import {
  ICustomProperties,
} from "./types";

function handleSinglePoint(feature: Feature<GeometryObject, ICustomProperties>, latlng: LatLng) {
  const mark = marker(latlng);
  const properties = feature.properties || {};

  if (properties.place && properties.place.name) {
    mark.bindPopup(properties.place.name);
  }

  return mark;
}

function handleClusteredPoint(feature: Feature<GeometryObject, ICustomProperties>, latlng: LatLng) {
  const count = feature.properties.point_count;
  let size: string;
  if (count < 100) {
    size = "small";
  } else if (count < 1000) {
    size = "medium";
  } else {
    size = "large";
  }
  const icon = divIcon({
    className: `marker-cluster marker-cluster-${size}`,
    html: `<div><span>${feature.properties.point_count_abbreviated}</span></div>`,
    iconSize: point(40, 40),
  });
  return marker(latlng, { icon });
}

const options: GeoJSONOptions = {
  filter: (feature) => feature.geometry.type === "Point",
  pointToLayer(feature: Feature<GeometryObject, ICustomProperties>, latlng: LatLng) {
    if (feature.properties.cluster) {
      return handleClusteredPoint(feature, latlng);
    } else {
      return handleSinglePoint(feature, latlng);
    }
  },
};
const markers = geoJSON(null, options);

function updateVisiblePoints(map: Map, cluster: Supercluster) {
  const bounds = map.getBounds();
  const bbox: BBox = [
    bounds.getWest(),
    bounds.getSouth(),
    bounds.getEast(),
    bounds.getNorth(),
  ];
  const visible = cluster.getClusters(bbox, map.getZoom());
  markers.clearLayers();
  for (const feature of visible) {
    markers.addData(feature);
  }
}

export default function renderPoints(geojson: FeatureCollection<Point, ICustomProperties>, map: Map) {
  markers.addTo(map);
  const cluster = supercluster({}).load(geojson.features);

  map.on("moveend", () => updateVisiblePoints(map, cluster));
  map.on("zoomend", () => updateVisiblePoints(map, cluster));
  updateVisiblePoints(map, cluster);
}
