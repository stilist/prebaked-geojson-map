# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Changed
- Update `package-lock.json` with npm 6
- Upgrade `@types/leaflet` dependency

## [1.0.6] - 2018-03-11
### Added
- Add missing `node-zopfli` dependency
- Add `strictPropertyInitialization` compiler flag from TypeScript 2.7

### Changed
- Upgrade `@types/leaflet`, `@types/node`, `babel-loader`, `cache-loader`, `css-loader`, `file-loader`, `leaflet`, `style-loader`, `supercluster`, `ts-loader`, `tslint`, `typescript`, `uglifyjs-webpack-plugin`, `url-loader`, `webpack`, and `webpack-bundle-analyzer` dependencies

## [1.0.5] - 2017-12-16
### Added
- Add gzip-compressed version of `dist/` files
- Add webpack-bundle-analyzer plugin
- Include TypeScript definition file
- Use cache-loader with css-loader and ts-loader

### Changed
- Add `.md` extension to `CHANGELOG`
- Update npm dependencies
- Move browserslist config outside webpack config
- Move Babel config outside webpack config
- Babel now recompiles TypeScript’s output using browserslist data
- Switch from awesome-typescript-loader to ts-loader
- Scope most plugins to production environment

### Fixed
- Fix `##` that should be `###` in change log
- Fix several minor copy errors
- Fix TypeScript compile errors revealed by running `tsc` directly

## [1.0.4] - 2017-11-25
### Added
- Add supercluster CSS to style clusters

### Fixed
- Fix bad copy/paste for link to 1.0.3 changes

## [1.0.3] - 2017-11-25
### Added
- Use supercluster plugin to cluster points together (leaflet.markercluster and
  PruneCluster have better UX, but I couldn’t get them to work correctly with
  Webpack and TypeScript -- and supercluster works much faster than
  leaflet.markercluster)

## [1.0.2] - 2017-11-21
### Added
- Add `LICENSE` file (was documented in `package.json`, but physical file was
  missing)
- Add `"description"`, `"bugs"`, `"homepage"` keys to `package.json`
- Add `"addBaseLayer"` event listener
- Export Leaflet's `tileLayer` method as `addLayer`

### Changed
- Change default map view from continental United States to African pole of
  inaccessibility
- Adjusted tslint config to detect unused imports and variables
- Adjusted `lint` script to automatically fix errors when possible
- Change author email address

### Removed
- Removed `tileLayers` export from namespace -- instead, use `Object.values()`
  on `namedTileLayers`
- Removed `add` as default export -- call `.add` explicitly

## [1.0.1] - 2017-11-21
### Added
- Link to `instant-map` example
- Add documentation in `README`
- Add `"resetOverlayLayers"` event listener

### Changed
- Add `.md` extension to `README`
- Renamed UMD export from `PrebakedLeafletMap` to `PrebakedGeoJSONMap`
  (`PrebakedLeafletMap` was the original name, but felt less accurate).
  This is a breaking change, but this module doesn't have any users currently,
  so it's just being marked as a patch release.

### Fixed
- Fix crashes for GeoJSON `Feature`s that don't include a `"properties"` key.

## 1.0.0 - 2017-11-20
### Added
- Initial release

[Unreleased]: https://github.com/stilist/prebaked-geojson-map/compare/v1.0.6...master
[1.0.6]: https://github.com/stilist/prebaked-geojson-map/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/stilist/prebaked-geojson-map/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/stilist/prebaked-geojson-map/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/stilist/prebaked-geojson-map/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/stilist/prebaked-geojson-map/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/stilist/prebaked-geojson-map/compare/v1.0.0...v1.0.1
