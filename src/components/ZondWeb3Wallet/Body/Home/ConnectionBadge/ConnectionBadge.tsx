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
import { ZOND_PROVIDER } from "@/configuration/zondConfig";
import { useStore } from "@/stores/store";
import { cva } from "class-variance-authority";
import { PlugZap, X } from "lucide-react";
import { observer } from "mobx-react-lite";

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

const blockchainSelectionClasses = cva("cursor-pointer ", {
  variants: {
    isSelected: {
      true: ["text-constructive focus:text-constructive"],
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

type ConnectionBadgeProps = {
  isDisabled?: boolean;
};

const ConnectionBadge = observer(
  ({ isDisabled = false }: ConnectionBadgeProps) => {
    const { zondStore } = useStore();
    const { zondConnection, selectBlockchain } = zondStore;
    const { isConnected, zondNetworkName } = zondConnection;

    const { DEV, TEST_NET, MAIN_NET } = ZOND_PROVIDER;
    const [isDevNetwork, isTestNetwork, isMainNetwork] = [
      DEV.name === zondNetworkName,
      TEST_NET.name === zondNetworkName,
      MAIN_NET.name === zondNetworkName,
    ];

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-foreground"
            disabled={isDisabled}
          >
            <Card
              className={networkStatusClasses({
                networkStatus: isConnected,
              })}
            />
            {zondNetworkName}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-80 rounded-md">
          <DialogHeader className="text-left">
            <DialogTitle>Select Blockchain</DialogTitle>
          </DialogHeader>
          <div>content</div>
          <DialogFooter className="flex flex-row gap-4">
            <DialogClose asChild>
              <Button className="w-full" type="button" variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button className="w-full" type="button" onClick={() => {}}>
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
