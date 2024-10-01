import { assert, define } from "../../";
import { test } from "../index.test";

test<string>((value) => {
  assert(
    value,
    define<string>("custom", () => true),
  );
  return value;
});
