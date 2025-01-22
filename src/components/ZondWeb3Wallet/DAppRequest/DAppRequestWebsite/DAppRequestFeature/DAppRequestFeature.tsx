import { RESTRICTED_METHODS } from "@/scripts/constants/requestConstants";
import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import EthRequestAccount from "./EthRequestAccount/EthRequestAccount";

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
        <EthRequestAccount
          addToResponseData={addToResponseData}
          decideCanProceed={decideCanProceed}
        />
      );
    default:
      return <></>;
  }
};

export default DAppRequestFeature;
