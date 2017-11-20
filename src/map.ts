import {
  control,
  icon,
  map,
  MapOptions,
  Marker,
} from "leaflet";
import {
  namedTileLayers,
  tileLayers,
} from "./layers";
import {
  ICustomLeafletEvent,
  ICustomProperties,
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
  // @see https://en.wikipedia.org/wiki/Geographic_center_of_the_contiguous_United_States
  center: [39.833333, -98.583333],
  layers: tileLayers[0],
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
  instance.on("addOverlayLayer", (event: ICustomLeafletEvent) => {
    layers.addOverlay(event.overlayLayer, event.key);
  });

  return instance;
}
export default addMap;
