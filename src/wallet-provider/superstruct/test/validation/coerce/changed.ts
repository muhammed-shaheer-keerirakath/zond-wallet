import { coerce, string, unknown } from "../../../";

export const Struct = coerce(string(), unknown(), (value) =>
  value === null || value === undefined ? "unknown" : value,
);

export const data = null;

export const output = "unknown";

export const create = true;
