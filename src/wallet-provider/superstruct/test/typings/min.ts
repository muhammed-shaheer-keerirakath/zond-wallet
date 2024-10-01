import { assert, min, number } from "../../";
import { test } from "../index.test";

test<number>((value) => {
  assert(value, min(number(), 0));
  return value;
});
