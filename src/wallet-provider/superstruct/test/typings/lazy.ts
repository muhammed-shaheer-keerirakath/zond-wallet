import { assert, lazy, string } from "../../";
import { test } from "../index.test";

test<string>((value) => {
  assert(
    value,
    lazy(() => string()),
  );
  return value;
});
