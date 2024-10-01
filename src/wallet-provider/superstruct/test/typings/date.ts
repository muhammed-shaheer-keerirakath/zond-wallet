import { assert, date } from "../../";
import { test } from "../index.test";

test<Date>((value) => {
  assert(value, date());
  return value;
});
