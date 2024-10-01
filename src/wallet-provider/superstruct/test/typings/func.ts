import { assert, func } from "../../";
import { test } from "../index.test";

// eslint-disable-next-line @typescript-eslint/ban-types
test<Function>((value) => {
  assert(value, func());
  return value;
});
