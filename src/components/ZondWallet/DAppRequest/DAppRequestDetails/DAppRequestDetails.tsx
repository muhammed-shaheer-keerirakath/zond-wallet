import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import StorageUtil from "@/utilities/storageUtil";
import { useEffect, useState } from "react";
import DAppRequestWebsite from "./DAppRequestWebsite/DAppRequestWebsite";

const DAppRequestDetails = () => {
  const [dAppRequestData, setDAppRequestData] = useState<
    DAppRequestType | undefined
  >();

  useEffect(() => {
    (async () => {
      const storedDAppRequestData = await StorageUtil.getDAppRequestData();
      setDAppRequestData(storedDAppRequestData);
    })();
  }, []);

  return (
    dAppRequestData && (
      <div className="flex flex-col gap-4">
        <DAppRequestWebsite dAppRequestData={dAppRequestData} />
      </div>
    )
  );
};

export default DAppRequestDetails;
