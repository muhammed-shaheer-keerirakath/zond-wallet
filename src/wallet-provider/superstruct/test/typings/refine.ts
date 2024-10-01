import { assert, refine, string } from "../../";
import { test } from "../index.test";

test<string>((value) => {
  assert(
    value,
    refine(string(), "word", () => true),
  );
  return value;
});
