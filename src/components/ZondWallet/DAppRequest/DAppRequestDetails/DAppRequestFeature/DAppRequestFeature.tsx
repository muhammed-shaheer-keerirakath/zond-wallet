import { REQUEST_METHODS } from "@/scripts/constants/requestConstants";
import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import EthRequestAccount from "./EthRequestAccount/EthRequestAccount";

type DAppRequestFeatureProps = {
  dAppRequestData: DAppRequestType;
  addToResponseData: (data: any) => void;
};

const DAppRequestFeature = ({
  dAppRequestData,
  addToResponseData,
}: DAppRequestFeatureProps) => {
  addToResponseData({});

  switch (dAppRequestData?.method) {
    case REQUEST_METHODS.ETH_REQUEST_ACCOUNT:
      return <EthRequestAccount addToResponseData={addToResponseData} />;
    default:
      return <></>;
  }
};

export default DAppRequestFeature;
