import Api from "../../services/Api";


const TYPES = {
    clearError: 'Users/CLEAR_ERROR',

    FetchUserSuccess: 'Users/FetchUser_SUCCESS',
    FetchUserFailure: 'Users/FetchUser_FAILURE',

    ShowUserSuccess: 'Users/ShowUser_SUCCESS',
    ShowUserFailure: 'Users/ShowUser_FAILURE',

    UpdateUserAdmSuccess: 'Users/UpdateUser_Adm_SUCCESS',
    UpdateUserAdmFailure: 'Users/UpdateUser_Adm_FAILURE',
}

const initialState = {
    error: null,
    users: [],
    page: 1,
    rowsPerPage: 10,
    total: 0,
    showNewUser: null
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.clearError:
            return Object.assign(state, { error: null })

        case TYPES.FetchUserSuccess:
            return { ...state, ...action.payload }
        case TYPES.FetchUserFailure:
            return { ...state, ...action.error }

        case TYPES.ShowUserSuccess:
            return { ...state, ...action.payload }
        case TYPES.ShowUserFailure:
            return { ...state, ...action.error }

        case TYPES.UpdateUserAdmSuccess:
            return { ...state, ...action.payload }
        case TYPES.UpdateUserAdmFailure:
            return { ...state, ...action.error }

        default:
            return state
    }
}

export default usersReducer;

/**
 * Pega todos os usuarios do sistema
 */
export const fetchUsers = (page = 0, rowsPerPage = 50, search) => async (dispatch, getState) => {
    //dispatch({ type: 'AUTH/CLEAR_ERROR' })
    //console.log(page = 1, rowsPerPage = 10, search)

    let { token } = getState().auth
    console.log(search)
    if (token) {
        var promise1 = new Promise(async (resolve, reject) => {
            try {
                let result = await Api.fetchUsers(token.token, page, rowsPerPage, search)
                console.log(result)
                dispatch({
                    type: TYPES.FetchUserSuccess,
                    payload: {
                        users: result.Table,
                        page: result.Page,
                        rowsPerPage: result.RowsPerPage,
                        total: result.Total
                    }
                });
                resolve(result)
            } catch (error) {
                dispatch({
                    type: TYPES.FetchUserFailure,
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

export const UserShow = (id) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.showUser(token.token, id)
            dispatch({
                type: TYPES.ShowUserSuccess,
                payload: {
                    showNewUser: user
                }
            })
            resolve()
        } catch (error) {
            dispatch({
                type: TYPES.ShowUserFailure,
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
export const UpdateUserAdm = ({ nome, email, image, id }) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.updateAdm(token.token, { nome, email, image }, id)
            dispatch({
                type: TYPES.UpdateUserAdmSuccess,
                payload: {
                    user
                }
            })
            resolve(user)
        } catch (error) {
            dispatch({
                type: TYPES.UpdateUserAdmFailure,
                error: { error }
            })
            reject(error)
        }
    })
    return promise1
}
