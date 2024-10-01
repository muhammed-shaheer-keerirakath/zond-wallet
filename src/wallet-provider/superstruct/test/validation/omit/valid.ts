import { number, object, omit, string } from "../../../";

export const Struct = omit(
  object({
    name: string(),
    age: number(),
  }),
  ["age"],
);

export const data = {
  name: "john",
};

export const output = {
  name: "john",
};
