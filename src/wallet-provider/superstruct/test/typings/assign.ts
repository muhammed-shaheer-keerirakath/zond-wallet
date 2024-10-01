import { assert, assign, number, object, string } from "../../";
import { test } from "../index.test";

test<{
  a: number;
  b: string;
}>((value) => {
  assert(value, assign(object({ a: number() }), object({ b: string() })));
  return value;
});
