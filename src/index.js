import { initState } from "./modules/state";
import { App } from "./app";

initState({ session: null, user: null, test: "lovely" });

App();
