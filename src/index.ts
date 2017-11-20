// @note Import extra files so Webpack knows about them.
import "./index.css";

import {
  namedTileLayers,
  tileLayers,
} from "./layers";
import add from "./map";
import renderPaths from "./render_paths";
import renderPoints from "./render_points";

export {
  add,
  renderPaths,
  renderPoints,
  namedTileLayers,
  tileLayers,
};
export default add;
