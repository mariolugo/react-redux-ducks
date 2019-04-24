import { combineEpics } from "redux-observable";
import { homeEpic } from "./home";

export const rootEpic = combineEpics(homeEpic);
