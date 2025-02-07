import { SEND_TRANSACTION_TYPES } from "../ZondSendTransaction";
import ZondSendTransactionContractDeployment from "./ZondSendTransactionContractDeployment/ZondSendTransactionContractDeployment";

type ZondSendTransactionContentProps = {
  transactionType: keyof typeof SEND_TRANSACTION_TYPES;
};

const ZondSendTransactionContent = ({
  transactionType,
}: ZondSendTransactionContentProps) => {
  if (transactionType === SEND_TRANSACTION_TYPES.CONTRACT_DEPLOYMENT) {
    return <ZondSendTransactionContractDeployment />;
  }
  return <div />;
};

export default ZondSendTransactionContent;
