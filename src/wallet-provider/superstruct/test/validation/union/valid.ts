import { number, string, type, union } from "../../../";

const First = type({ a: string() });
const Second = type({ b: number() });

export const Struct = union([First, Second]);

export const data = {
  a: "a",
};

export const output = {
  a: "a",
};
