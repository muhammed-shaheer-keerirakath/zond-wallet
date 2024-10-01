import { assert, number, object, pick, string } from "../../";
import { test } from "../index.test";

test<{
  b: string;
}>((value) => {
  assert(value, pick(object({ a: number(), b: string() }), ["b"]));
  return value;
});
