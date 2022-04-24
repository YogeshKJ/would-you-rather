import * as API from '../utils/_DATA'

export const SUBMIT_QUESTION = 'SUBMIT_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const SAVE_QID = 'SAVE_QID'
export const USER_ANSWERED_QUESTION = 'USER_ANSWERED_QUESTION'

function saveQuestion(question) {
    return {
        type: SUBMIT_QUESTION,
        question
    }
}

function saveQuestionAnswer({ authedUser, qid, answer }) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

function userAnsweredQuestion({authedUser, qid, answer}) {
    return {
        type: USER_ANSWERED_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function saveQid(qid) {
    return {
        type: SAVE_QID,
        qid
    }
}

export function handleSubmitQuestion(author, optionOneText, optionTwoText) {
    return dispatch => {

        return API._saveQuestion({ author, optionOneText, optionTwoText })
            .then((question) => {
                dispatch(saveQuestion(question))
            })
    }
}

export function handleSubmitAnswer(answer) {
    return dispatch => {
        return API._saveQuestionAnswer(answer)
            .then(() => {
                dispatch(saveQuestionAnswer(answer))
                dispatch(userAnsweredQuestion(answer))
            })
    }
}
