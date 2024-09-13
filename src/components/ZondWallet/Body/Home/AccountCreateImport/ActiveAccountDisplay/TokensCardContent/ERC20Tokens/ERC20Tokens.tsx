import { useStore } from "@/stores/store";
import StorageUtil from "@/utilities/storageUtil";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ERC20Token from "./ERC20Token/ERC20Token";

const ERC20Tokens = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount, zondConnection } = zondStore;
  const { accountAddress } = activeAccount;
  const { blockchain } = zondConnection;

  const [tokenContractsList, setTokenContractsList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const storedTokens = await StorageUtil.getTokenContractsList(
        blockchain,
        accountAddress,
      );
      setTokenContractsList(storedTokens);
    })();
  }, [blockchain, accountAddress]);

  return tokenContractsList.map((contractAddress) => (
    <ERC20Token key={contractAddress} contractAddress={contractAddress} />
  ));
});

export default ERC20Tokens;
