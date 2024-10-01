import { assert, instance } from "../../";
import { test } from "../index.test";

test<Date>((value) => {
  assert(value, instance(Date));
  return value;
});
