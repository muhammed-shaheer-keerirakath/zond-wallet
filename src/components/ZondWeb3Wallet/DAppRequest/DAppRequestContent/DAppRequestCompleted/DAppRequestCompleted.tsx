import { Button } from "@/components/UI/Button";
import { Card, CardContent, CardFooter } from "@/components/UI/Card";
import ConnectionBadge from "@/components/ZondWeb3Wallet/Body/Home/ConnectionBadge/ConnectionBadge";
import { useStore } from "@/stores/store";
import { Check, CircleCheck, CircleX } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const DAppRequestCompleted = observer(() => {
  const { dAppRequestStore } = useStore();
  const { approvalProcessingStatus } = dAppRequestStore;
  const { hasApproved } = approvalProcessingStatus;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Card className="w-full">
        <div className="flex justify-center pt-6">
          <ConnectionBadge isDisabled={true} />
        </div>
        <CardContent className="flex flex-col items-center space-y-2 pt-6">
          {hasApproved ? (
            <CircleCheck className="h-16 w-16 text-secondary" />
          ) : (
            <CircleX className="h-16 w-16 text-secondary" />
          )}
          <div className="font-bold">
            The request has been {hasApproved ? "approved" : "rejected"}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
          <div />
          <Button
            className="w-full"
            type="button"
            onClick={() => {
              window.close();
            }}
          >
            <Check className="mr-2 h-4 w-4" />
            Done
          </Button>
        </CardFooter>
      </Card>
    </>
  );
});

export default DAppRequestCompleted;
