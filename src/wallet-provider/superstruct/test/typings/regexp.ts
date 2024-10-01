import { assert, regexp } from "../../";
import { test } from "../index.test";

test<RegExp>((value) => {
  assert(value, regexp());
  return value;
});
