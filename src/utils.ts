interface IObject {
  [name: string]: any;
}

// @see https://stackoverflow.com/a/4740873/672403
type Source = IObject | null;
export function defaults(...sources: Source[]): IObject {
  const destination: IObject = {};

  for (const source of sources) {
    if (source === null) {
      continue;
    }

    for (const key in source) {
      if (!destination[key]) {
        destination[key] = source[key];
      }
    }
  }

  return destination;
}
