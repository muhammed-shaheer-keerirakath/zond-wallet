import { number, omit, string, type } from "../../../";

export const Struct = omit(
  type({
    name: string(),
    age: number(),
  }),
  ["age"],
);

export const data = {
  name: "john",
  unknownProperty: "unknown",
};

export const output = {
  name: "john",
  unknownProperty: "unknown",
};
