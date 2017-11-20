import {
  Feature,
  GeometryObject,
} from "geojson";
import {
  LeafletEvent,
} from "leaflet";

// `ICustomFeature` and `IGroupedFeatures` are necessary to create a type based
// on`Feature` that supports defined custom property keys.
export interface ICustomProperties {
  activity?: string;
  color?: string;
  place?: {
    name?: string;
  };
  startTimestamp?: Date;
  endTimestamp?: Date;
  [name: string]: any;
}
export interface ICustomFeature<G extends GeometryObject, P extends ICustomProperties> extends Feature<G, P> {
  properties: P;
}
export interface IGroupedFeatures {
  [name: string]: Array<Feature<GeometryObject, ICustomProperties>>;
}

// Needed to support arbitrary keys.
export interface ICustomLeafletEvent extends LeafletEvent {
  [name: string]: any;
}

export interface IRawNamedTileLayers {
  [name: string]: string[];
}

export interface IColors {
  [name: string]: string;
}
export interface IDashes {
  [name: string]: string;
}
