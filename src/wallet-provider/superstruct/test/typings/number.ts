import { assert, number } from "../../";
import { test } from "../index.test";

test<number>((value) => {
  assert(value, number());
  return value;
});
