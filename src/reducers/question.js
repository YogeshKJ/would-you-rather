import { SAVE_QUESTION_ANSWER, SUBMIT_QUESTION } from "../actions/question";
import { RECEIVE_DATA } from "../actions/shared";

export default function question(state = {}, action) {
    switch (action.type) {
        case SUBMIT_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case RECEIVE_DATA:
            return action.questions
        case SAVE_QUESTION_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        default:
            return state
    }
}