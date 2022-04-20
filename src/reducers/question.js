import { RECEIVE_ALL_QUESTION, SUBMIT_QUESTION } from "../actions/question";
import { RECEIVE_DATA } from "../actions/shared";

export default function question(state = {}, action) {
    switch (action.type) {
        case SUBMIT_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case RECEIVE_ALL_QUESTION:
            return action.questions
        case RECEIVE_DATA:
            return action.questions
        default:
            return state
    }
}