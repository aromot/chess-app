export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type ISomeType = { [key: string]: unknown };
type mapValueOptionType = {
  exec?: boolean;
};
export function mapValue(
  value: keyof ISomeType,
  map: ISomeType,
  options: mapValueOptionType = {}
) {
  options.exec = options.hasOwnProperty("exec") ? options.exec : true;

  const ret = map[value] || false;

  if (ret === false) return ret;

  if (typeof ret === "function") return options.exec ? ret(value) : ret;

  return ret;
}
