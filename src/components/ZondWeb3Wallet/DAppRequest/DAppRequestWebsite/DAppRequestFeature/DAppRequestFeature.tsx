import { RESTRICTED_METHODS } from "@/scripts/constants/requestConstants";
import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import ZondRequestAccount from "./ZondRequestAccount/ZondRequestAccount";
import ZondSendTransaction from "./ZondSendTransaction/ZondSendTransaction";

type DAppRequestFeatureProps = {
  dAppRequestData: DAppRequestType;
  addToResponseData: (data: any) => void;
  decideCanProceed: (decision: boolean) => void;
};

const DAppRequestFeature = ({
  dAppRequestData,
  addToResponseData,
  decideCanProceed,
}: DAppRequestFeatureProps) => {
  switch (dAppRequestData?.method) {
    case RESTRICTED_METHODS.ZOND_REQUEST_ACCOUNTS:
      return (
        <ZondRequestAccount
          addToResponseData={addToResponseData}
          decideCanProceed={decideCanProceed}
        />
      );
    case RESTRICTED_METHODS.ZOND_SEND_TRANSACTION:
      return (
        <ZondSendTransaction
          dAppRequestData={dAppRequestData}
          addToResponseData={addToResponseData}
          decideCanProceed={decideCanProceed}
        />
      );
    default:
      return <></>;
  }
};

export default DAppRequestFeature;
