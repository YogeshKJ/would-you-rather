import { SAVE_QID } from "../actions/question";

export default function qid(state = '', action) {
    switch(action.type) {
        case SAVE_QID:
            return action.qid
        default:
            return state
    }
}