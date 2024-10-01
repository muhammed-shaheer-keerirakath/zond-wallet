import { assert, enums, number, object, optional, string } from "../../";
import { test } from "../index.test";

test<string | undefined>((value) => {
  assert(value, optional(string()));
  return value;
});

test<{
  a?: number | undefined;
  b: string;
}>((value) => {
  assert(
    value,
    object({
      a: optional(number()),
      b: string(),
    }),
  );
  return value;
});

test<{
  a: "a";
  b: "b";
}>(() => {
  return optional(enums(["a", "b"])).schema;
});
