import {
  control,
  icon,
  Layer,
  map,
  MapOptions,
  Marker,
} from "leaflet";
import {
  namedTileLayers,
} from "./layers";
import {
  ICustomLeafletEvent,
} from "./types";
import {
  defaults,
} from "./utils";

// Fix image URL lookup for Webpack.
//
// @see https://github.com/Leaflet/Leaflet/issues/4968
Marker.prototype.options.icon = icon({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const defaultOptions = Object.freeze({
  // @see https://en.wikipedia.org/wiki/Pole_of_inaccessibility#Africa
  center: [5.65, 26.17],
  layers: namedTileLayers["Open Street Map"],
  maxZoom: 18,
  zoom: 5,
});
function addMap(id: string = "map", options: MapOptions = {}) {
  let el = document.getElementById(id);
  if (el === null) {
    el = document.createElement("div");
    el.setAttribute("id", id);
    document.body.appendChild(el);
  }

  // @note Ideally this would use lodash's `defaults`, via
  //   `import defaults from "lodash.defaults"`, but that currently causes
  //   TS1192 because lodash doesn't export its functions in an ES6-compatible
  //   way.
  //
  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19153
  // @see https://github.com/lodash/lodash/issues/3192
  // @see https://stackoverflow.com/q/39415661/672403
  const mergedOptions = defaults(options, defaultOptions);
  const instance = map(el, mergedOptions);

  const layers = control.layers(namedTileLayers).addTo(instance);
  // This is necessary because `control.layers(...)` always creates a new layer
  // control -- it's a better user experience to add *all* layers to a single
  // control.
  const addedOverlayLayers: Layer[] = [];
  instance.on("addOverlayLayer", (event: ICustomLeafletEvent) => {
    layers.addOverlay(event.overlayLayer, event.key);
    addedOverlayLayers.push(event.overlayLayer);
  });
  // There doesn't seem to be a way to determine what layers have been added to
  // the control.
  instance.on("resetOverlayLayers", () => {
    for (const layer of addedOverlayLayers) {
      layers.removeLayer(layer);
      instance.removeLayer(layer);

      const index = addedOverlayLayers.indexOf(layer);
      addedOverlayLayers.splice(index, 1);
    }
  });

  return instance;
}
export default addMap;
