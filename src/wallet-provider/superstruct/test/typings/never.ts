import { assert, never } from "../../";
import { test } from "../index.test";

test<never>((value) => {
  assert(value, never());
  return value;
});
