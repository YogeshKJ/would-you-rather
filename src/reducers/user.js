import { SUBMIT_QUESTION, USER_ANSWERED_QUESTION } from "../actions/question";
import { RECEIVE_DATA } from "../actions/shared";

export default function users(state = null, action) {
    switch (action.type) {
        case RECEIVE_DATA:
            return action.users
        case USER_ANSWERED_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case SUBMIT_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.question.id])
                }
            }
        default:
            return state
    }
}