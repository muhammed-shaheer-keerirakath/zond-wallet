import { any, assert } from "../../";
import { test } from "../index.test";

test<any>((value) => {
  assert(value, any());
  return value;
});
