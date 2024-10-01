import { coerce, string, unknown } from "../../../";

export const Struct = coerce(string(), unknown(), (value) =>
  value === null || value === undefined ? "unknown" : value,
);

export const data = "known";

export const output = "known";

export const create = true;
