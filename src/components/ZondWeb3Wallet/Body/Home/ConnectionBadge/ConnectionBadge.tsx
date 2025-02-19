import { Button } from "@/components/UI/Button";
import { Card } from "@/components/UI/Card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { BlockchainType, ZOND_PROVIDER } from "@/configuration/zondConfig";
import { useStore } from "@/stores/store";
import { cva } from "class-variance-authority";
import { HardDrive, Network, PlugZap, Workflow, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const networkStatusClasses = cva("h-2 w-2 rounded-full", {
  variants: {
    networkStatus: {
      true: ["bg-constructive"],
      false: ["bg-destructive"],
    },
  },
  defaultVariants: {
    networkStatus: false,
  },
});

const getConnectionTypeIcon = (blockchain: string) => {
  switch (blockchain) {
    case ZOND_PROVIDER.TEST_NET.id:
      return <Workflow className="mr-1 h-3 w-3" />;
    case ZOND_PROVIDER.MAIN_NET.id:
      return <Network className="mr-1 h-3 w-3" />;
    default:
      return <HardDrive className="mr-1 h-3 w-3" />;
  }
};

type ConnectionBadgeProps = {
  isDisabled?: boolean;
};

const ConnectionBadge = observer(
  ({ isDisabled = false }: ConnectionBadgeProps) => {
    const { zondStore } = useStore();
    const { zondConnection, selectBlockchain } = zondStore;
    const { isConnected, blockchain } = zondConnection;

    const [selectedBlockchain, setSelectedBlockchain] = useState(blockchain);

    return (
      <Dialog>
        <DialogTrigger asChild disabled={isDisabled}>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-foreground"
          >
            <Card
              className={networkStatusClasses({
                networkStatus: isConnected,
              })}
            />
            {ZOND_PROVIDER[blockchain].name}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-80 rounded-md">
          <DialogHeader className="text-left">
            <DialogTitle>Select Blockchain</DialogTitle>
          </DialogHeader>
          <div>
            <Tabs
              defaultValue={blockchain}
              onValueChange={(value) => {
                setSelectedBlockchain(value as BlockchainType);
              }}
            >
              <TabsList className="grid w-full grid-cols-3">
                {Object.values(ZOND_PROVIDER).map((provider) => {
                  return (
                    <TabsTrigger key={provider.id} value={provider.id}>
                      {getConnectionTypeIcon(provider.id)}
                      <span className="text-xs">{provider.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {Object.values(ZOND_PROVIDER).map((provider) => {
                return (
                  <TabsContent key={provider.id} value={provider.id}>
                    <Card className="p-2">
                      <div className="space-y-2">
                        <div>{provider.description}</div>
                        {provider.isConfigurationRequired && (
                          <div>the form for ip and port</div>
                        )}
                      </div>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
          <DialogFooter className="flex flex-row gap-4">
            <DialogClose asChild>
              <Button className="w-full" type="button" variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="w-full"
              type="button"
              onClick={() => {
                selectBlockchain(selectedBlockchain);
              }}
            >
              <PlugZap className="mr-2 h-4 w-4" />
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

export default ConnectionBadge;
