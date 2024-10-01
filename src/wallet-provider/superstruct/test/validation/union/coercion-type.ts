import { defaulted, number, string, type, union } from "../../../";

const First = string();
const Second = type({ a: number(), b: defaulted(number(), 5) });

export const Struct = union([First, Second]);

export const data = { a: 5 };

export const output = { a: 5, b: 5 };

export const create = true;
