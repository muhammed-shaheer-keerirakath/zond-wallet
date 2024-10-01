import { assert, boolean } from "../../";
import { test } from "../index.test";

test<boolean>((value) => {
  assert(value, boolean());
  return value;
});
