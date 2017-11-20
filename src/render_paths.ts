import {
  Feature,
  FeatureCollection,
  GeometryObject,
} from "geojson";
import {
  Control,
  geoJSON,
  GeoJSONOptions,
  layerGroup,
  Map,
  PathOptions,
} from "leaflet";
import {
  colors,
  dashes,
} from "./path_styles";
import {
  ICustomProperties,
  IGroupedFeatures,
} from "./types";

const options: GeoJSONOptions = {
  style: (feature: Feature<GeometryObject, ICustomProperties>) => {
    const activity: string = feature.properties.activity;
    let styleOptions: PathOptions = {};

    if (!activity) {
      return styleOptions;
    }

    const color = feature.properties.color || colors[activity] || "#fc0";
    styleOptions = {
      color,
      opacity: 0.65,
      weight: 2,
    };
    if (dashes[activity]) {
      styleOptions.dashArray = dashes[activity];
    }

    return styleOptions;
  },
};

export default function renderPaths(geojson: FeatureCollection<GeometryObject, ICustomProperties>, map: Map) {
  const features = geojson.features;
  const grouped: IGroupedFeatures = features.reduce((memo: IGroupedFeatures, feature) => {
    const key = feature.properties.activity || "default";

    if (!memo[key]) {
      memo[key] = [];
    }
    memo[key].push(feature);

    return memo;
  }, {});

  const layers: Control.LayersObject = {};
  for (const key of Object.keys(grouped)) {
    const groupedFeatures: Array<Feature<GeometryObject, ICustomProperties>> = grouped[key];

    const filtered = groupedFeatures.filter((feature) => feature.geometry.type !== "Point");
    if (filtered.length === 0) {
      continue;
    }

    // @note `geoJSON` can actually accept an array of `GeoJSONObject`s /
    //   `Feature`s directly, but the type definition currently only accepts a
    //   single object, so the array throws TS2345.
    const overlayLayer = layerGroup(groupedFeatures.map((feature) => {
      return geoJSON(feature, options);
    }));
    map.addLayer(overlayLayer);
    map.fire("addOverlayLayer", { overlayLayer, key });
  }
}
