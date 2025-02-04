import { RESTRICTED_METHODS } from "@/scripts/constants/requestConstants";
import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import ZondRequestAccount from "./ZondRequestAccount/ZondRequestAccount";

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
  addToResponseData({});

  switch (dAppRequestData?.method) {
    case RESTRICTED_METHODS.ZOND_REQUEST_ACCOUNTS:
      return (
        <ZondRequestAccount
          addToResponseData={addToResponseData}
          decideCanProceed={decideCanProceed}
        />
      );
    case RESTRICTED_METHODS.ZOND_SEND_TRANSACTION:
    default:
      return <></>;
  }
};

export default DAppRequestFeature;
