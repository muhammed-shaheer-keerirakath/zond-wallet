import { useStore } from "@/stores/store";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import DAppRequestContent from "./DAppRequestContent/DAppRequestContent";

const DAppRequest = observer(() => {
  const { dAppRequestStore } = useStore();
  const { dAppRequestData, readDAppRequestData } = dAppRequestStore;

  useEffect(() => {
    readDAppRequestData();
  }, []);

  return dAppRequestData ? (
    <DAppRequestContent />
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 pt-48">
      <Loader className="animate-spin" size={86} />
      Checking for pending requests...
    </div>
  );
});

export default DAppRequest;
