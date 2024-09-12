import { ERC_20_CONTRACT_ABI } from "@/constants/erc20Token";
import { NATIVE_TOKEN } from "@/constants/nativeToken";
import { getOptimalGasFee } from "@/functions/getOptimalGasFee";
import { useStore } from "@/stores/store";
import { utils } from "@theqrl/web3";
import { cva } from "class-variance-authority";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

type GasFeeNoticeProps = {
  isErc20Token: boolean;
  tokenContractAddress: string;
  tokenDecimals: number;
  from: string;
  to: string;
  value: number;
  isSubmitting: boolean;
};

const gasFeeNoticeClasses = cva(
  "m-1 flex justify-around rounded-lg border border-white px-4 py-2",
  {
    variants: {
      isSubmitting: {
        true: ["opacity-30"],
        false: ["opacity-80"],
      },
    },
    defaultVariants: {
      isSubmitting: false,
    },
  },
);

export const GasFeeNotice = observer(
  ({
    isErc20Token,
    tokenContractAddress,
    tokenDecimals,
    from,
    to,
    value,
    isSubmitting,
  }: GasFeeNoticeProps) => {
    const { zondStore } = useStore();
    const { zondInstance } = zondStore;

    const hasValuesForGasCalculation = !!from && !!to && !!value;

    const [gasFee, setGasFee] = useState({
      estimatedGas: "",
      isLoading: true,
      error: "",
    });

    const fetchNativeTokenGas = async () => {
      if (zondInstance) {
        const transaction = {
          from,
          to,
          value: BigInt(value * 10 ** NATIVE_TOKEN.decimals),
        };
        const estimatedTransactionGas =
          await zondInstance.estimateGas(transaction);
        const gasPrice = await zondInstance.getGasPrice();
        return utils.fromWei(estimatedTransactionGas * gasPrice, "ether");
      }
      return "";
    };

    const fetchErc20TokenGas = async () => {
      if (zondInstance && zondInstance.Contract) {
        const contract = new zondInstance.Contract(
          ERC_20_CONTRACT_ABI,
          tokenContractAddress,
        );
        const contractTransfer = contract.methods.transfer(
          to,
          BigInt(value * 10 ** tokenDecimals),
        );
        const estimatedTransactionGas = await contractTransfer.estimateGas({
          from,
        });
        const gasPrice = await zondInstance.getGasPrice();
        return utils.fromWei(estimatedTransactionGas * gasPrice, "ether");
      }
      return "";
    };

    const fetchGasFee = async () => {
      setGasFee({ ...gasFee, isLoading: true, error: "" });
      try {
        let gasFeeAmount = "";
        gasFeeAmount = await (isErc20Token
          ? fetchErc20TokenGas()
          : fetchNativeTokenGas());
        const estimatedGas = getOptimalGasFee(gasFeeAmount);
        setGasFee({ ...gasFee, estimatedGas, error: "", isLoading: false });
      } catch (error) {
        setGasFee({ ...gasFee, error: `${error}`, isLoading: false });
      }
    };

    useEffect(() => {
      fetchGasFee();
    }, [from, to, value]);

    return (
      hasValuesForGasCalculation && (
        <div className={gasFeeNoticeClasses({ isSubmitting })}>
          {gasFee.isLoading ? (
            <div className="flex gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Estimating gas fee
            </div>
          ) : gasFee.error ? (
            <div>{gasFee.error}</div>
          ) : (
            <div className="w-full overflow-hidden">
              Estimated gas fee is {gasFee?.estimatedGas}
            </div>
          )}
        </div>
      )
    );
  },
);
