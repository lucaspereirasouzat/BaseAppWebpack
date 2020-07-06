import Api from "../../services/Api";


const TYPES = {
    clearError: 'Mentor/CLEAR_ERROR',

    FetchMentorSuccess: 'Mentor/FetchMentor_SUCCESS',
    FetchMentorFailure: 'Mentor/FetchMentor_FAILURE',

    ShowMentorSuccess: 'Mentor/ShowMentor_SUCCESS',
    ShowMentorFailure: 'Mentor/ShowMentor_FAILURE',

    UpdateMentorAdmSuccess: 'Mentor/UpdateMentor_Adm_SUCCESS',
    UpdateMentorAdmFailure: 'Mentor/UpdateMentor_Adm_FAILURE',

    RegisterSuccess: 'AUTH/Register_SUCCESS',
    RegisterFailure: 'AUTH/Register_FAILURE',

}

const initialState = {
    error: null,
    users: [],
    page: 1,
    rowsPerPage: 10,
    total: 0,
    showNewMentor: null
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.clearError:
            return Object.assign(state, { error: null })

        case TYPES.FetchMentorSuccess:
            return { ...state, ...action.payload }
        case TYPES.FetchMentorFailure:
            return { ...state, ...action.error }

        case TYPES.ShowMentorSuccess:
            return { ...state, ...action.payload }
        case TYPES.ShowMentorFailure:
            return { ...state, ...action.error }

        case TYPES.UpdateMentorAdmSuccess:
            return { ...state, ...action.payload }
        case TYPES.UpdateMentorAdmFailure:
            return { ...state, ...action.error }

        case TYPES.RegisterSuccess:
            return { ...state, ...action.payload }
        case TYPES.RegisterFailure:
            return { ...state, ...action.error }

        default:
            return state
    }
}

export default usersReducer;

/**
 * Pega todos os usuarios do sistema
 */
export const fetchMentors = (page = 1, rowsPerPage = 10, search) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    //console.log(page = 1, rowsPerPage = 10, search)

    let { token } = getState().auth
    console.log(search)
    if (token) {
        var promise1 = new Promise(async (resolve, reject) => {
            try {
                let result = await Api.fetchMentors(token.token, page, rowsPerPage, search)
                console.log(result)
                dispatch({
                    type: TYPES.FetchMentorSuccess,
                    payload: {
                        users: result.data,
                        page: result.page,
                        rowsPerPage: result.perPage,
                        total: result.total
                    }
                });
                resolve(result)
            } catch (error) {
                dispatch({
                    type: TYPES.FetchMentorFailure,
                    error: { error }
                })
                reject(error)
            }
        });
    }
    return promise1;
}

/**
 * Pegar dados de um usuario
 */

export const MentorShow = (id) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.showMentor(token.token, id)
            dispatch({
                type: TYPES.ShowMentorSuccess,
                payload: {
                    showNewMentor: user
                }
            })
            resolve()
        } catch (error) {
            dispatch({
                type: TYPES.ShowMentorFailure,
                error: { error }
            })
            reject(error)
        }
    })
    return promise1
}

/**
 * atualiza os dados de user sendo adm
 */
export const UpdateMentorAdm = ({ nome, email, image, id }) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.updateMentor(token.token, { nome, email, image }, id)
            dispatch({
                type: TYPES.UpdateMentorAdmSuccess,
                payload: {
                    user
                }
            })
            resolve(user)
        } catch (error) {
            dispatch({
                type: TYPES.UpdateMentorAdmFailure,
                error: { error }
            })
            reject(error)
        }
    })
    return promise1
}


/**
 * Faz o cadastro do mentor
 */
export const registerMentor = ({ username, email, password }) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    let body = {
        username,
        email,
        password
    }
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let { token } = getState().auth
            let result = await Api.registerMentor(token.token, body)
            dispatch({
                type: TYPES.RegisterSuccess,
                payload: {
                    result
                }
            })
            resolve({
                ...result
            })
        } catch (error) {
            dispatch({
                type: TYPES.RegisterFailure,
                error: { error: error.response.data }
            })
            reject(error.response.data)
        }
    })
    return promise1;
}