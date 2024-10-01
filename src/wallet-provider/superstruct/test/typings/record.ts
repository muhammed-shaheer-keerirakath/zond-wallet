import { assert, number, record, string } from "../../";
import { test } from "../index.test";

test<Record<string, number>>((value) => {
  assert(value, record(string(), number()));
  return value;
});
