# `prebaked-geojson-map`

This package makes it very easy to add [GeoJSON data] to a to a preconfigured
[Leaflet] map.

## Installation

`npm install --save-dev prebaked-geojson-map`

## Usage

This module exports a [UMD object] named `PrebakedGeoJSONMap`; you can see the
exported members in `src/index.ts`.

Here are the basic steps to use this module in a webpage:

1. Load this module's `index.css` and `index.js` into your page.
2. `var map = window.PrebakedGeoJSONMap.add();`. `.add` takes the same options
   as [Leaflet's `L.map`][leaflet new map]. It includes some default options
   (see `src/map.ts`) and automatically adds some base layers (see
   `src/layers.ts`).
3. Add data to the map with `window.PrebakedGeoJSONMap.renderPaths(data, map);`
   and `window.PrebakedGeoJSONMap.renderPoints(data, map);`. `data` must be
   valid GeoJSON data, either as a JavaScript object literal or via
   `JSON.parse`.

You can see these steps demonstrated by `example/index.html`. The
[`instant-map`][instant-map] project is slightly more complex; the user drags a
GeoJSON file into the browser window and the GeoJSON data is projected on the
map.

The `Map` instance returned by `.add` has two custom [event listeners] that
work around limitations in Leaflet’s API:

* `"addOverlayLayer"` allows you to add a new `Layer` or `LayerGroup` overlay
  to the existing [layers control]. Leaflet’s API only allows you to add a new
  overlay layer by calling [`L.control.layers`][new layers control], which will
  always add another layers control. Use it like
  `map.fire("addOverlayLayer", { overlayLayer: layer, key: 'foo' });`.
* `"resetOverlayLayers"` allows you to remove all the overlay layers from the
  layers control. Use it like `map.fire("resetOverlayLayers")`. Note that this
  will not remove `Marker`s added by `.renderPoints`: to remove those, run
  `map.eachLayer(layer => { if (!layer._url) map.removeLayer(layer) });`.

[GeoJSON data]: http://geojson.org
[Leaflet]: http://leafletjs.com
[UMD object]: https://github.com/umdjs/umd
[leaflet new map]: http://leafletjs.com/reference-1.2.0.html#map
[instant-map]: https://github.com/stilist/instant-map
[event listeners]: http://leafletjs.com/reference-1.2.0.html#evented-fire
[layers control]: http://leafletjs.com/reference-1.2.0.html#control-layers
[new layers control]: http://leafletjs.com/reference-1.2.0.html#control-layers-l-control-layers
