import { array, assert, number } from "../../";
import { test } from "../index.test";

test<unknown[]>((value) => {
  assert(value, array());
  return value;
});

test<number[]>((value) => {
  assert(value, array(number()));
  return value;
});
