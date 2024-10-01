import { assert, number, object } from "../../";
import { test } from "../index.test";

test<{ a?: number }>((value) => {
  assert(value, object({ a: number() }));
  return value;
});
