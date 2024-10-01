import { defaulted, object, string } from "../../../";

export const Struct = object({
  title: defaulted(string(), "Untitled"),
});

export const data = {};

export const output = {
  title: "Untitled",
};

export const create = true;
