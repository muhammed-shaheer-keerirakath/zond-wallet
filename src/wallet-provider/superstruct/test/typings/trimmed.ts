import { assert, string, trimmed } from "../../";
import { test } from "../index.test";

test<string>((value) => {
  assert(value, trimmed(string()));
  return value;
});
