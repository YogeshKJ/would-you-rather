import * as API from '../utils/_DATA'
import { handleInitialData } from './shared'

export const SUBMIT_QUESTION = 'SUBMIT_QUESTION'
export const POLL_QUESTION_ID = 'POLL_QUESTION_ID'
export const RECEIVE_ALL_QUESTION = 'SAVE_ALL_QUESTION'

function saveQuestion(question) {
    return {
        type: SUBMIT_QUESTION,
        question
    }
}

function saveAllQuestion(questions) {
    return {
        type: RECEIVE_ALL_QUESTION,
        questions
    }
}

export function pollQuestionId(questionId) {
    return {
        type: POLL_QUESTION_ID,
        questionId
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
                dispatch(getQuestion())
            })
    }
}

export function getQuestion() {
    return dispatch => {
        return API._getQuestions()
            .then((question) => {
                dispatch(saveAllQuestion(question))
            })
    }
}
