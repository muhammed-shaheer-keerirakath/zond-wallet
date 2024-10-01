import { assert, number, object, string } from "../../";
import { test } from "../index.test";

test<Record<string, unknown>>((value) => {
  assert(value, object());
  return value;
});

test<{
  a: number;
  b: string;
}>((value) => {
  assert(value, object({ a: number(), b: string() }));
  return value;
});
