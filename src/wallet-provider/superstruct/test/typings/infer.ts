import type { Infer } from "../../";
import { assert, object } from "../../";
import { test } from "../index.test";

const Struct = object();
type T = Infer<typeof Struct>;

test<T>((value) => {
  assert(value, Struct);
  return value;
});
