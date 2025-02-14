import { SEND_TRANSACTION_TYPES } from "../ZondSendTransaction";
import ZondSendTransactionForContract from "./ZondSendTransactionContractDeployment/ZondSendTransactionForContract";

type ZondSendTransactionContentProps = {
  transactionType: keyof typeof SEND_TRANSACTION_TYPES;
};

const ZondSendTransactionContent = ({
  transactionType,
}: ZondSendTransactionContentProps) => {
  if (
    transactionType === SEND_TRANSACTION_TYPES.CONTRACT_DEPLOYMENT ||
    transactionType === SEND_TRANSACTION_TYPES.CONTRACT_INTERACTION
  ) {
    return <ZondSendTransactionForContract transactionType={transactionType} />;
  }
  return <div />;
};

export default ZondSendTransactionContent;
