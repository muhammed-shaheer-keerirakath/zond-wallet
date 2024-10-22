import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import DAppRequestWebsite from "./DAppRequestWebsite/DAppRequestWebsite";

type DAppRequestDetailsProps = {
  dAppRequestData: DAppRequestType;
  addToResponseData: (data: any) => void;
};

const DAppRequestDetails = ({
  dAppRequestData,
  addToResponseData,
}: DAppRequestDetailsProps) => {
  return (
    dAppRequestData && (
      <DAppRequestWebsite
        dAppRequestData={dAppRequestData}
        addToResponseData={addToResponseData}
      />
    )
  );
};

export default DAppRequestDetails;
