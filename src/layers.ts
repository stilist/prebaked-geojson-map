import {
  Control,
  Layer,
  tileLayer,
} from "leaflet";
import {
  IRawNamedTileLayers,
} from "./types";

const rawLayers: IRawNamedTileLayers = Object.freeze({
  carto_dark: [
    "CartoDB dark",
    "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    "© <a href=http://www.openstreetmap.org/copyright>OpenStreetMap</a> \
      contributors © <a href=https://carto.com/attributions>CARTO</a>",
  ],
  osm: [
    "Open Street Map",
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "Map data © <a href=http://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors",
  ],
  stamen_toner: [
    "Stamen Watercolor",
    "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
    "Map tiles by <a href=http://stamen.com>Stamen Design</a>, under \
      <a href=http://creativecommons.org/licenses/by/3.0>CC BY 3.0</a>. Data \
      by <a href=http://openstreetmap.org>OpenStreetMap</a>, under \
      <a href=http://www.openstreetmap.org/copyright>ODbL</a>.",
  ],
});

export const namedTileLayers: Control.LayersObject = Object.keys(rawLayers)
  .reduce((memo: Control.LayersObject, key) => {
    const [name, urlTemplate, attribution] = rawLayers[key];
    memo[name] = tileLayer(urlTemplate, {
      attribution,
    });

    return memo;
  }, {});

export const tileLayers: Layer[] = Object.values(namedTileLayers);
