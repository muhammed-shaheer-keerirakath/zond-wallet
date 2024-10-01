import { defaulted, number, object, string } from "../../../";

export const Struct = defaulted(
  object({
    title: string(),
    version: number(),
  }),
  {
    title: "Untitled",
  },
);

export const data = {
  version: 0,
};

export const output = {
  title: "Untitled",
  version: 0,
};

export const create = true;
