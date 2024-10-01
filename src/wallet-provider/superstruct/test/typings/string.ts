import { assert, string } from "../../";
import { test } from "../index.test";

test<string>((value) => {
  assert(value, string());
  return value;
});
