import { defaulted, number, string, union } from "../../../";

const First = defaulted(string(), "foo");
const Second = number();

export const Struct = union([First, Second]);

export const data = undefined;

export const output = "foo";

export const create = true;
