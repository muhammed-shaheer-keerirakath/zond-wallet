import { deprecated, number } from "../../../";

export const Struct = deprecated(number(), () => {
  /* noop */
});

export const data = 42;

export const output = 42;
