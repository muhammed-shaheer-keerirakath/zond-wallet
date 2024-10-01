import { assert, integer } from "../../";
import { test } from "../index.test";

test<number>((value) => {
  assert(value, integer());
  return value;
});
