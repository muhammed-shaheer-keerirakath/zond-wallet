import { nullable, number, string, type } from "../../../";

export const Struct = type({
  name: nullable(string()),
  age: number(),
});

export const data = {
  name: "Jill",
  age: 42,
};

export const output = {
  name: "Jill",
  age: 42,
};
