import { assert, number, type } from "../../";
import { test } from "../index.test";

test<{ a: number }>((value) => {
  assert(value, type({ a: number() }));
  return value;
});
