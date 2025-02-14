import { describe, expect, it } from "@jest/globals";
import { getSplitAddress } from "../getSplitAddress";

describe("getSplitAddress", () => {
  it("should render the account id component", () => {
    const address = "0x20D20b8026B8F02540246f58120ddAAf35AECD9B";
    const expectedPrefix = "0x";
    const expectedAddressSplit = [
      "20D20",
      "b8026",
      "B8F02",
      "54024",
      "6f581",
      "20ddA",
      "Af35A",
      "ECD9B",
    ];
    expect(getSplitAddress(address).prefix).toEqual(expectedPrefix);
    expect(getSplitAddress(address).addressSplit).toEqual(expectedAddressSplit);
  });
});
