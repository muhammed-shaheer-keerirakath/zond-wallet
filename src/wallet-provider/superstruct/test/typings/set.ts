import { assert, set, string } from "../../";
import { test } from "../index.test";

test<Set<string>>((value) => {
  assert(value, set(string()));
  return value;
});
