import { assert, map, number, string } from "../../";
import { test } from "../index.test";

test<Map<string, number>>((value) => {
  assert(value, map(string(), number()));
  return value;
});
