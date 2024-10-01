import { number, object, partial, string } from "../../../";

export const Struct = partial(
  object({
    name: string(),
    age: number(),
  }),
);

export const data = {
  name: "john",
};

export const output = {
  name: "john",
};
