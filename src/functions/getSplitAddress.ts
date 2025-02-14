export const getSplitAddress = (address: string) => {
  const prefix = address?.substring(0, 2);
  const addressSplit: string[] = [];
  for (let i = 2; i < address?.length; i += 5) {
    addressSplit.push(address?.substring(i, i + 5));
  }
  return { prefix, addressSplit };
};
