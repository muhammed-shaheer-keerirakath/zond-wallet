import { deprecated, string } from "../../..";

export const Struct = deprecated(string(), () => {
  /* noop */
});

export const data = null;

export const failures = [
  {
    value: null,
    type: "string",
    refinement: undefined,
    path: [],
    branch: [data],
  },
];
