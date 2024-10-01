import { assert, unknown } from "../../";
import { test } from "../index.test";

test<unknown>((value) => {
  assert(value, unknown());
  return value;
});
