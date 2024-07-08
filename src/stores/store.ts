import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import SettingsStore from "./settingsStore";

class Store {
  accountStore;
  settingsStore;

  constructor() {
    this.accountStore = new AccountStore();
    this.settingsStore = new SettingsStore();
  }
}

export const store = new Store();
const StoreContext = createContext(store);
export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
