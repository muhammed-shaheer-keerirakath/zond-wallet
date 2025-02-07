import { Button } from "@/components/UI/Button";
import { Card, CardContent, CardFooter } from "@/components/UI/Card";
import { useStore } from "@/stores/store";
import { Check, Loader, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ConnectionBadge from "../Body/Home/ConnectionBadge/ConnectionBadge";
import DAppRequestWebsite from "./DAppRequestWebsite/DAppRequestWebsite";

const DAppRequest = observer(() => {
  const { dAppRequestStore } = useStore();
  const {
    dAppRequestData,
    readDAppRequestData,
    onPermission,
    canProceed,
    approvalProcessingStatus,
  } = dAppRequestStore;
  const { isProcessing, hasApproved } = approvalProcessingStatus;
  const isRejectionProcessing = isProcessing && !hasApproved;
  const isApprovalProcessing = isProcessing && hasApproved;

  useEffect(() => {
    readDAppRequestData();
  }, []);

  return dAppRequestData ? (
    <>
      <img
        className="fixed z-0 h-96 w-96 -translate-x-8 animate-rotate-scale overflow-hidden opacity-30"
        src="tree.svg"
      />
      <div className="relative z-10 flex flex-col items-center space-y-4 p-4">
        <Card className="w-full">
          <div className="flex justify-center pt-6">
            <ConnectionBadge isDisabled={true} />
          </div>
          <div className="p-6">
            <div className="mb-1 text-xs font-bold">
              Your permission required
            </div>
            <div>
              Here is a request coming in. Go through the details and decide if
              it needs to be allowed.
            </div>
          </div>
          <CardContent className="space-y-6">
            <DAppRequestWebsite />
            <div className="font-bold">
              Do you trust and want to allow this?
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-4">
            <Button
              className="w-full"
              variant="outline"
              type="button"
              disabled={isProcessing}
              onClick={() => onPermission(false)}
            >
              {isRejectionProcessing ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              No
            </Button>
            <Button
              className="w-full"
              type="button"
              disabled={!canProceed || isProcessing}
              onClick={() => onPermission(true)}
            >
              {isApprovalProcessing ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              Yes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  ) : (
    <div className="flex justify-center p-4">
      <Loader className="mr-2 h-4 w-4 animate-spin" />
      Checking for pending requests
    </div>
  );
});

export default DAppRequest;
