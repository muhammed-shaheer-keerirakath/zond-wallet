import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { EXTENSION_MESSAGES } from "@/scripts/constants/streamConstants";
import { DAppResponseType } from "@/scripts/middlewares/connectWalletMiddleware";
import StorageUtil from "@/utilities/storageUtil";
import { Check, ShieldAlert, X } from "lucide-react";
import browser from "webextension-polyfill";
import ConnectionBadge from "../Body/Home/ConnectionBadge/ConnectionBadge";
import DAppRequestDetails from "./DAppRequestDetails/DAppRequestDetails";

const DAppRequest = () => {
  const onPermission = async (hasApproved: boolean) => {
    try {
      await StorageUtil.clearDAppRequestData();
      const response: DAppResponseType = {
        action: EXTENSION_MESSAGES.DAPP_RESPONSE,
        hasApproved,
      };
      await browser.runtime.sendMessage(response);
    } catch (error) {
      console.warn(
        "ZondWallet: Error while resolving the permission request\n",
        error,
      );
    } finally {
      window.close();
    }
  };

  return (
    <>
      <img
        className="fixed z-0 h-96 w-96 -translate-x-8 animate-rotate-scale overflow-hidden opacity-30"
        src="tree.svg"
      />
      <div className="relative z-10 flex flex-col items-center space-y-8 p-8">
        <ConnectionBadge isDisabled={true} />
        <Card>
          <CardHeader>
            <CardTitle>Your permission required</CardTitle>
            <CardDescription>
              Here is a request coming in. Go through the details and decide if
              it needs to be allowed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <DAppRequestDetails />
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Careful!</AlertTitle>
              <AlertDescription>
                There are token approval scams out there. Ensure you only
                connect your wallet with the websites you trust.
              </AlertDescription>
            </Alert>
            <div className="font-bold">Do you want to allow this?</div>
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-4">
            <Button
              className="w-full"
              variant="outline"
              type="button"
              onClick={() => onPermission(false)}
            >
              <X className="mr-2 h-4 w-4" />
              No
            </Button>
            <Button
              className="w-full"
              type="button"
              onClick={() => onPermission(true)}
            >
              <Check className="mr-2 h-4 w-4" />
              Yes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default DAppRequest;
