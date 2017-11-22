// @note Import extra files so Webpack knows about them.
import "./index.css";

import {
  tileLayer,
} from "leaflet";
import {
  namedTileLayers,
} from "./layers";
import add from "./map";
import renderPaths from "./render_paths";
import renderPoints from "./render_points";

export {
  add,
  tileLayer as addLayer,
  renderPaths,
  renderPoints,
  namedTileLayers,
};
export default add;
