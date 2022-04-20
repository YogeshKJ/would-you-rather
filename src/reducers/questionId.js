import { POLL_QUESTION_ID } from "../actions/question";

export default function questionId(state = '', action) {
    switch(action.type) {
        case POLL_QUESTION_ID:
            return action.questionId
        default:
            return state
    }
}