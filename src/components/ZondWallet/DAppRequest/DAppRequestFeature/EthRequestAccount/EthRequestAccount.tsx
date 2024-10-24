import { Checkbox } from "@/components/UI/Checkbox";
import AccountId from "@/components/ZondWallet/Body/AccountList/AccountId/AccountId";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

type EthRequestAccountProps = {
  addToResponseData: (data: any) => void;
  decideCanProceed: (decision: boolean) => void;
};

const EthRequestAccount = observer(
  ({ addToResponseData, decideCanProceed }: EthRequestAccountProps) => {
    const { zondStore } = useStore();
    const { activeAccount } = zondStore;
    const account = activeAccount?.accountAddress;

    const [response, setResponse] = useState<{ accounts: string[] }>({
      accounts: [],
    });

    useEffect(() => {
      addToResponseData({ ...response });
    }, [response]);

    return (
      <div className="flex flex-col gap-4">
        <div className="text-sm font-bold">
          Connect your zond wallet account
        </div>
        {account ? (
          <div className="flex items-start space-x-3">
            <Checkbox
              id="account"
              onCheckedChange={(checked) => {
                if (checked) {
                  setResponse({ accounts: [account] });
                  decideCanProceed(true);
                } else {
                  setResponse({ accounts: [] });
                  decideCanProceed(false);
                }
              }}
            />
            <label
              htmlFor="account"
              className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <AccountId account={account} />
            </label>
          </div>
        ) : (
          <div>Account not available to connect</div>
        )}
      </div>
    );
  },
);

export default EthRequestAccount;
