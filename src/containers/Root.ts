import RootProd from "./Root.prod";
import RootDev from "./Root.dev";

let Root;

if (import.meta.env.PROD) {
  Root = RootProd;
} else {
  Root = RootDev;
}

export { Root };
