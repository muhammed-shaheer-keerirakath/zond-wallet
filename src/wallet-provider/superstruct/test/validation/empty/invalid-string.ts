import { empty, string } from "../../../";

export const Struct = empty(string());

export const data = "invalid";

export const failures = [
  {
    value: "invalid",
    type: "string",
    refinement: "empty",
    path: [],
    branch: [data],
  },
];
