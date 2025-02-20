/**
 * A utility for handling string related operations
 */
class StringUtil {
  /**
   * A function for splitting the address with spaces between them, making the address more readable.
   */
  static getSplitAddress(accountAddress: string, splitLength: number = 5) {
    const prefix = accountAddress.substring(0, 1);
    const addressSplit: string[] = [];
    for (let i = 1; i < accountAddress.length; i += splitLength) {
      addressSplit.push(accountAddress.substring(i, i + splitLength));
    }

    return { prefix, addressSplit };
  }
}

export default StringUtil;
