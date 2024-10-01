import { array, assert, empty, map, set, string } from "../../";
import { test } from "../index.test";

test<string>((value) => {
  assert(value, empty(string()));
  return value;
});

test<unknown[]>((value) => {
  assert(value, empty(array()));
  return value;
});

test<Set<unknown>>((value) => {
  assert(value, empty(set()));
  return value;
});

test<Map<unknown, unknown>>((value) => {
  assert(value, empty(map()));
  return value;
});
