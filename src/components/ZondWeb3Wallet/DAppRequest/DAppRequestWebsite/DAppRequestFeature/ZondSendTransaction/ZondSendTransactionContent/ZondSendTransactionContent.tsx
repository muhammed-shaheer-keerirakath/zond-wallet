import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import { SEND_TRANSACTION_TYPES } from "../ZondSendTransaction";
import ZondSendTransactionContractDeployment from "./ZondSendTransactionContractDeployment/ZondSendTransactionContractDeployment";

type ZondSendTransactionContentProps = {
  transactionType: keyof typeof SEND_TRANSACTION_TYPES;
  dAppRequestData: DAppRequestType;
};

const ZondSendTransactionContent = ({
  transactionType,
  dAppRequestData,
}: ZondSendTransactionContentProps) => {
  if (transactionType === SEND_TRANSACTION_TYPES.CONTRACT_DEPLOYMENT) {
    return (
      <ZondSendTransactionContractDeployment
        dAppRequestData={dAppRequestData}
      />
    );
  }
  return <div />;
};

export default ZondSendTransactionContent;
