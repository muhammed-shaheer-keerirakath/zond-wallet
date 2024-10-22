import { Card } from "@/components/UI/Card";
import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";

type DAppRequestWebsiteProps = {
  dAppRequestData: DAppRequestType;
};

const DAppRequestWebsite = ({ dAppRequestData }: DAppRequestWebsiteProps) => {
  return (
    <Card className="flex gap-4 p-4">
      <img
        className="h-8"
        src={dAppRequestData?.requestData?.senderData?.favIconUrl}
        alt={dAppRequestData?.requestData?.senderData?.title}
      />
      <div className="flex flex-col gap-1">
        <span className="font-bold">
          {dAppRequestData?.requestData?.senderData?.url}
        </span>
        <span className="text-xm opacity-80">
          {dAppRequestData?.requestData?.senderData?.title}
        </span>
      </div>
    </Card>
  );
};

export default DAppRequestWebsite;
