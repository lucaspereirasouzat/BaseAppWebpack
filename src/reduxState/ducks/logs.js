import Api from "services/Api";


const TYPES = {
    clearError: 'Log/CLEAR_ERROR',

    FetchLogSuccess: 'Log/FetchLog_SUCCESS',
    FetchLogFailure: 'Log/FetchLog_FAILURE',

    ShowLogSuccess: 'Log/ShowLog_SUCCESS',
    ShowLogFailure: 'Log/ShowLog_FAILURE',

    UpdateLogAdmSuccess: 'Log/UpdateLog_Adm_SUCCESS',
    UpdateLogAdmFailure: 'Log/UpdateLog_Adm_FAILURE',

    RegisterSuccess: 'LOG/Register_SUCCESS',
    RegisterFailure: 'LOG/Register_FAILURE',

}

const initialState = {
    error: null,
    logs: [],
    page: 1,
    rowsPerPage: 10,
    total: 0,
    showNewLog: null
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.clearError:
            return Object.assign(state, { error: null })

        case TYPES.FetchLogSuccess:
            return { ...state, ...action.payload }
        case TYPES.FetchLogFailure:
            return { ...state, ...action.error }

        case TYPES.ShowLogSuccess:
            return { ...state, ...action.payload }
        case TYPES.ShowLogFailure:
            return { ...state, ...action.error }

        case TYPES.UpdateLogAdmSuccess:
            return { ...state, ...action.payload }
        case TYPES.UpdateLogAdmFailure:
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
export const fetchLogs = (page = 1, rowsPerPage = 50, search = "") => async (dispatch, getState) => {
    //dispatch({ type: 'LOG/CLEAR_ERROR' })
    // console.log(page = 1, rowsPerPage = 10, search)

    let { token } = getState().auth

    if (token) {
        var promise1 = new Promise(async (resolve, reject) => {
            try {
                let result = await Api.fetchLog(token.token, page, rowsPerPage, search)
                let table = result.Table.map(({ user, time, ...props }) => {

                    return {
                        //  user: user.username ? user.username : "",
                        ...props,
                        time: time,
                    }
                })
                //console.log(table);

                dispatch({
                    type: TYPES.FetchLogSuccess,
                    payload: {
                        logs: table,
                        page: result.Page,
                        rowsPerPage: result.RowsPerPage,
                        total: result.Total
                    }
                });
                resolve(result)
            } catch (error) {
                dispatch({
                    type: TYPES.FetchLogFailure,
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

export const LogShow = (id) => async (dispatch, getState) => {
    dispatch({ type: 'LOG/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.showLog(token.token, id)
            dispatch({
                type: TYPES.ShowLogSuccess,
                payload: {
                    showNewLog: user
                }
            })
            resolve()
        } catch (error) {
            dispatch({
                type: TYPES.ShowLogFailure,
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
export const UpdateLogAdm = ({ nome, email, image, id }) => async (dispatch, getState) => {
    dispatch({ type: 'LOG/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.updateLog(token.token, { nome, email, image }, id)
            dispatch({
                type: TYPES.UpdateLogAdmSuccess,
                payload: {
                    user
                }
            })
            resolve(user)
        } catch (error) {
            dispatch({
                type: TYPES.UpdateLogAdmFailure,
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
export const registerLog = ({ username, email, password }) => async (dispatch, getState) => {
    dispatch({ type: 'LOG/CLEAR_ERROR' })
    let body = {
        username,
        email,
        password
    }
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let { token } = getState().auth
            let result = await Api.registerLog(token.token, body)
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