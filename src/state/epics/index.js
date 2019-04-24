import { combineEpics } from "redux-observable";
import { listEpic } from "./list";

export const rootEpic = combineEpics(listEpic);
