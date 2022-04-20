import question from "./question";
import users from "./user";
import authedUser from "./authedUser";
import loading from "./loading";

import { combineReducers } from "redux";

export default combineReducers({
    question,
    users,
    authedUser,
    loading
})