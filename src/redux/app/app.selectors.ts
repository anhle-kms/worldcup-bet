import { AppConstant } from "../../constants/app.constants";

export const getUser = (globalState) => globalState[AppConstant.redux.APP_STATE].user;
