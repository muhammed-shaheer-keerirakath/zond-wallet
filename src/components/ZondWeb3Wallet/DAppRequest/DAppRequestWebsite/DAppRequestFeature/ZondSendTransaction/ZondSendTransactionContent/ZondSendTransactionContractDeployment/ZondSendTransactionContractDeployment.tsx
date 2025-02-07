import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { useStore } from "@/stores/store";
import { Copy } from "lucide-react";
import { observer } from "mobx-react-lite";

const ZondSendTransactionContractDeployment = observer(() => {
  const { dAppRequestStore } = useStore();
  const { dAppRequestData } = dAppRequestStore;

  const params = dAppRequestData?.params[0];
  const accountAddress = params?.from;
  const prefix = accountAddress.substring(0, 2);
  const addressSplit: string[] = [];
  for (let i = 2; i < accountAddress.length; i += 5) {
    addressSplit.push(accountAddress.substring(i, i + 5));
  }
  const totalGas = BigInt(params?.gas);
  const data = params?.data;

  const copyData = () => {
    navigator.clipboard.writeText(data);
  };

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="data">Data</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="rounded-md bg-muted p-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div>From address</div>
            <div className="w-64 font-bold text-secondary">{`${prefix} ${addressSplit.join(" ")}`}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div>Gas Limit</div>
            <div className="font-bold text-secondary">
              {totalGas.toString()}
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="data" className="rounded-md bg-muted p-2">
        <div className="flex flex-col gap-1">
          <div>Data</div>
          <div className="flex gap-2">
            <div className="h-[8rem] w-full overflow-hidden break-words font-bold text-secondary">
              {data}
            </div>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    className="w-12 hover:text-secondary"
                    variant="outline"
                    size="icon"
                    onClick={copyData}
                  >
                    <Copy size="18" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <Label>Copy Data</Label>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
});

export default ZondSendTransactionContractDeployment;
