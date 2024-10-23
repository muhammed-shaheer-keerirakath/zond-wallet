import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import DAppRequestWebsite from "./DAppRequestWebsite/DAppRequestWebsite";

type DAppRequestDetailsProps = {
  dAppRequestData: DAppRequestType;
  addToResponseData: (data: any) => void;
  decideCanProceed: (decision: boolean) => void;
};

const DAppRequestDetails = ({
  dAppRequestData,
  addToResponseData,
  decideCanProceed,
}: DAppRequestDetailsProps) => {
  return (
    dAppRequestData && (
      <DAppRequestWebsite
        dAppRequestData={dAppRequestData}
        addToResponseData={addToResponseData}
        decideCanProceed={decideCanProceed}
      />
    )
  );
};

export default DAppRequestDetails;
