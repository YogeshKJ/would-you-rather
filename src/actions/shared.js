import * as API from '../utils/_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData(users, questions) {
    return {
        type: RECEIVE_DATA,
        users,
        questions
    }
}

export function handleInitialData(){
    return dispatch => {
        return Promise.all([
            API._getUsers(),
            API._getQuestions(),
        ]).then(([users, questions]) => {
            dispatch(receiveData(users, questions))
        })
    }
}