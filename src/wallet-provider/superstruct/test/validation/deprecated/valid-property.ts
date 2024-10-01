import { any, deprecated, number, type } from "../../../";

export const Struct = type({
  name: deprecated(any(), () => {
    /* noop */
  }),
  age: number(),
});

export const data = {
  age: 42,
};

export const output = {
  age: 42,
};
