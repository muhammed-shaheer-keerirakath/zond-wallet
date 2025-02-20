import StringUtil from "@/utilities/stringUtil";
import { observer } from "mobx-react-lite";

type AccountIdType = {
  account: string;
};

const AccountId = observer(({ account }: AccountIdType) => {
  const { prefix, addressSplit } = StringUtil.getSplitAddress(account);

  return (
    <div className="flex gap-1">
      <div className="text-xs">{prefix}</div>
      <div className="flex flex-wrap gap-1">
        {addressSplit.map((part) => (
          <div className="text-xs" key={part}>
            {part}
          </div>
        ))}
      </div>
    </div>
  );
});

export default AccountId;
