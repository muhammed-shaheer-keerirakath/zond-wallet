import { assert, bigint } from "../../";
import { test } from "../index.test";

test<bigint>((value) => {
  assert(value, bigint());
  return value;
});
