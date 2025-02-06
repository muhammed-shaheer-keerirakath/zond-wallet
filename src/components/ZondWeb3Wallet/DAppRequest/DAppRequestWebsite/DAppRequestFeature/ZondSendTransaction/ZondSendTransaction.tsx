import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import ZondSendTransactionContent from "./ZondSendTransactionContent/ZondSendTransactionContent";

export const SEND_TRANSACTION_TYPES = {
  CONTRACT_DEPLOYMENT: "CONTRACT_DEPLOYMENT",
  CONTRACT_INTERACTION: "CONTRACT_INTERACTION",
  ZND_TRANSFER: "ZND_TRANSFER",
  UNKNOWN: "UNKNOWN",
} as const;

type ZondSendTransactionProps = {
  dAppRequestData: DAppRequestType;
};

const ZondSendTransaction = ({ dAppRequestData }: ZondSendTransactionProps) => {
  let transactionHeading = "";
  let transactionSubHeading = "";
  const transactionType = getTransactionType(dAppRequestData?.params[0]);

  function getTransactionType(params: any) {
    if (!params || typeof params !== "object") {
      return SEND_TRANSACTION_TYPES.UNKNOWN;
    }
    const { to, value, data } = params;
    if (!to && data) {
      transactionHeading = "Deploy a contract";
      transactionSubHeading = "This site wants to deploy a contract";
      return SEND_TRANSACTION_TYPES.CONTRACT_DEPLOYMENT;
    } else if (to && data) {
      transactionHeading = "Interact with a contract";
      transactionSubHeading = "This site wants to interact with a contract";
      return SEND_TRANSACTION_TYPES.CONTRACT_INTERACTION;
    } else if (to && value && !data) {
      transactionHeading = "Transfer ZND";
      transactionSubHeading = "This site wants to send ZND";
      return SEND_TRANSACTION_TYPES.ZND_TRANSFER;
    }
    return SEND_TRANSACTION_TYPES.UNKNOWN;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-2xl font-bold">{transactionHeading}</div>
        <div>{transactionSubHeading}</div>
      </div>
      <div className="flex flex-col gap-4">
        <ZondSendTransactionContent
          transactionType={transactionType}
          dAppRequestData={dAppRequestData}
        />
      </div>
    </div>
  );
};

export default ZondSendTransaction;
