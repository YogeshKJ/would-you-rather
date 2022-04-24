import question from "./question";
import users from "./user";
import authedUser from "./authedUser";
import qid from "./qid";

import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
    question,
    users,
    authedUser,
    qid,
    loadingBar: loadingBarReducer
})