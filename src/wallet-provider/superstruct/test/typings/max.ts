import { assert, max, number } from "../../";
import { test } from "../index.test";

test<number>((value) => {
  assert(value, max(number(), 0));
  return value;
});
