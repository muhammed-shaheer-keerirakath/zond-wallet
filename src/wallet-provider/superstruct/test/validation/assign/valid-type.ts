import { assign, number, object, string, type } from "../../../";

const First = type({ a: string() });
const Second = object({ b: number() });

export const Struct = assign(First, Second);

export const data = {
  a: "1",
  b: 2,
  c: 3,
};

export const output = {
  a: "1",
  b: 2,
  c: 3,
};
