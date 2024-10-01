import { number, string, type, union } from "../../../";

const First = type({ a: string() });
const Second = type({ b: number() });

export const Struct = union([First, Second]);

export const data = {
  b: "invalid",
};

export const failures = [
  {
    value: { b: "invalid" },
    type: "union",
    refinement: undefined,
    path: [],
    branch: [data],
  },
  {
    value: undefined,
    type: "string",
    refinement: undefined,
    path: ["a"],
    branch: [data, undefined],
  },
  {
    value: "invalid",
    type: "number",
    refinement: undefined,
    path: ["b"],
    branch: [data, data.b],
  },
];
