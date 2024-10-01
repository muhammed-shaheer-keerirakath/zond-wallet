import { assert, dynamic, string } from "../../";
import { test } from "../index.test";

test<string>((value) => {
  assert(
    value,
    dynamic(() => string()),
  );
  return value;
});
