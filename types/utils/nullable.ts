export type Nullable<T> = {
  [k in keyof T]?: T[k] | null;
};
