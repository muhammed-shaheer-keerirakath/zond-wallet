import { Card } from "@/components/UI/Card";
import { Separator } from "@/components/UI/Separator";
import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import DAppRequestFeature from "./DAppRequestFeature/DAppRequestFeature";

type DAppRequestWebsiteProps = {
  dAppRequestData: DAppRequestType;
  addToResponseData: (data: any) => void;
  decideCanProceed: (decision: boolean) => void;
};

const DAppRequestWebsite = ({
  dAppRequestData,
  addToResponseData,
  decideCanProceed,
}: DAppRequestWebsiteProps) => {
  const parsedUrl = new URL(dAppRequestData?.requestData?.senderData?.url ?? "");
  const urlOrigin = parsedUrl.origin;

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex gap-4 items-center">
        <img
          className="h-6 w-6"
          src={dAppRequestData?.requestData?.senderData?.favIconUrl}
          alt={dAppRequestData?.requestData?.senderData?.title}
        />
        <div className="flex flex-col">
          <span className="font-bold">
            {urlOrigin}
          </span>
          <span className="text-xm opacity-80">
            {dAppRequestData?.requestData?.senderData?.title}
          </span>
        </div>
      </div>
      <Separator />
      <DAppRequestFeature
        dAppRequestData={dAppRequestData}
        addToResponseData={addToResponseData}
        decideCanProceed={decideCanProceed}
      />
    </Card>
  );
};

export default DAppRequestWebsite;
