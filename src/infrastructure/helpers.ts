export function getEnumKeys(enumObj: any): string[] {
  return Object.keys(enumObj).filter(key => isNaN(Number(key)));
}
