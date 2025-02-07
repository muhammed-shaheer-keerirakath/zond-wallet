import { EXTENSION_MESSAGES } from "@/scripts/constants/streamConstants";
import {
  DAppRequestType,
  DAppResponseType,
} from "@/scripts/middlewares/middlewareTypes";
import StorageUtil from "@/utilities/storageUtil";
import { action, makeAutoObservable, observable } from "mobx";
import browser from "webextension-polyfill";

class DAppRequestStore {
  dAppRequestData?: DAppRequestType;
  responseData: any = {};
  canProceed: boolean = false;
  onPermissionCallBack: (hasApproved: boolean) => Promise<void> = async () =>
    undefined;
  approvalProcessingStatus = { isProcessing: false, hasApproved: false };

  constructor() {
    makeAutoObservable(this, {
      dAppRequestData: observable.struct,
      responseData: observable.struct,
      readDAppRequestData: action.bound,
      addToResponseData: action.bound,
      setCanProceed: action.bound,
      setOnPermissionCallBack: action.bound,
      onPermission: action.bound,
      approvalProcessingStatus: observable.struct,
    });
  }

  async readDAppRequestData() {
    const storedDAppRequestData = await StorageUtil.getDAppRequestData();
    this.dAppRequestData = storedDAppRequestData;
  }

  addToResponseData(data: any) {
    this.responseData = { ...this.responseData, ...data };
  }

  setCanProceed(decision: boolean) {
    this.canProceed = decision;
  }

  setOnPermissionCallBack(callBack: (hasApproved: boolean) => Promise<void>) {
    this.onPermissionCallBack = callBack;
  }

  async onPermission(hasApproved: boolean) {
    try {
      this.approvalProcessingStatus = { isProcessing: true, hasApproved };
      await this.onPermissionCallBack(hasApproved);
      await StorageUtil.clearDAppRequestData();
      const response: DAppResponseType = {
        method: this.dAppRequestData?.method ?? "",
        action: EXTENSION_MESSAGES.DAPP_RESPONSE,
        hasApproved,
        response: this.responseData,
      };
      await browser.runtime.sendMessage(response);
    } catch (error) {
      console.warn(
        "ZondWeb3Wallet: Error while resolving the permission request\n",
        error,
      );
    } finally {
      this.approvalProcessingStatus = {
        isProcessing: false,
        hasApproved: false,
      };
      window.close();
    }
  }
}

export default DAppRequestStore;
