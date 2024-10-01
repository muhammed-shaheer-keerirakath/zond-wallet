import { assert, coerce, number, string } from "../../";
import { test } from "../index.test";

test<number>((value) => {
  assert(
    value,
    coerce(number(), string(), (coercionValue) => parseFloat(coercionValue)),
  );
  return value;
});
