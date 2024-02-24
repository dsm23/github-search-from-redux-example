import configureStoreProd from "./configureStore.prod";
import configureStoreDev from "./configureStore.dev";

let configureStore;

if (import.meta.env.PROD) {
  configureStore = configureStoreProd;
} else {
  configureStore = configureStoreDev;
}

export { configureStore };
