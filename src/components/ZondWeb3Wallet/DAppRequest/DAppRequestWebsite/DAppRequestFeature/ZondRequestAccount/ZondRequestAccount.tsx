import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";
import { Checkbox } from "@/components/UI/Checkbox";
import AccountId from "@/components/ZondWeb3Wallet/Body/AccountList/AccountId/AccountId";
import { useStore } from "@/stores/store";
import { ShieldAlert } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

type ZondRequestAccountProps = {
  addToResponseData: (data: any) => void;
  decideCanProceed: (decision: boolean) => void;
};

const ZondRequestAccount = observer(
  ({ addToResponseData, decideCanProceed }: ZondRequestAccountProps) => {
    const { zondStore } = useStore();
    const { zondAccounts } = zondStore;
    const availableAccounts = zondAccounts.accounts.map(
      (account) => account.accountAddress,
    );

    const [response, setResponse] = useState<{ accounts: string[] }>({
      accounts: [],
    });

    useEffect(() => {
      addToResponseData({ ...response });
    }, [response]);

    const onAccountSelection = (selectedAccount: string, checked: boolean) => {
      let accounts = response.accounts;
      if (checked) {
        accounts = Array.from(new Set([...accounts, selectedAccount]));
      } else {
        accounts = accounts.filter((account) => account !== selectedAccount);
      }
      decideCanProceed(accounts.length > 0);
      setResponse({ accounts: [...accounts] });
    };

    return (
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-lg font-bold">Connect with Zond Web3 Wallet</div>
          <div>Select the accounts you want the app to connect with</div>
        </div>
        {!!availableAccounts.length ? (
          availableAccounts.map((account) => (
            <div className="flex items-start space-x-3">
              <Checkbox
                id={account}
                onCheckedChange={(checked) =>
                  onAccountSelection(account, !!checked)
                }
              />
              <label
                htmlFor={account}
                className="cursor-pointer text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <AccountId account={account} />
              </label>
            </div>
          ))
        ) : (
          <div>No accounts available to connect</div>
        )}
        <Alert className="mt-2">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Careful!</AlertTitle>
          <AlertDescription className="text-xs">
            There are token approval scams out there. Ensure you only connect
            your wallet with the websites you trust.
          </AlertDescription>
        </Alert>
      </div>
    );
  },
);

export default ZondRequestAccount;
