interface Options<T> {
  where: T;
  sort?: string | string[];
  limit?: number;
  offset?: number;
}
export default Options;
