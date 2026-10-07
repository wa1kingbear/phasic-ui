type ClassNameValue = false | null | string | undefined;

export function mergeClassNames(...values: ClassNameValue[]) {
  return values.filter(Boolean).join(' ');
}
