import { assert, number, object, omit, string, type } from "../../";
import { test } from "../index.test";

test<{
  b: string;
}>((value) => {
  assert(value, omit(object({ a: number(), b: string() }), ["a"]));
  return value;
});

test<{
  b: string;
}>((value) => {
  assert(value, omit(type({ a: number(), b: string() }), ["a"]));
  return value;
});
