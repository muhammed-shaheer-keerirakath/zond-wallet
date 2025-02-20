import StringUtil from "@/utilities/stringUtil";
import { observer } from "mobx-react-lite";

type AccountIdType = {
  account: string;
};

const AccountId = observer(({ account }: AccountIdType) => {
  const { prefix, addressSplit } = StringUtil.getSplitAddress(account);

  return (
    <div className="flex gap-2">
      <div>{prefix}</div>
      <div className="flex flex-wrap gap-1">
        {addressSplit.map((part) => (
          <div key={part}>{part}</div>
        ))}
      </div>
    </div>
  );
});

export default AccountId;
