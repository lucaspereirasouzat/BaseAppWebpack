import Api from "../../services/Api";


const TYPES = {
    clearError: 'Cliente/CLEAR_ERROR',

    FetchClienteSuccess: 'Cliente/FetchCliente_SUCCESS',
    FetchClienteFailure: 'Cliente/FetchCliente_FAILURE',

    ShowClienteSuccess: 'Cliente/ShowCliente_SUCCESS',
    ShowClienteFailure: 'Cliente/ShowCliente_FAILURE',

    UpdateClienteAdmSuccess: 'Cliente/UpdateCliente_Adm_SUCCESS',
    UpdateClienteAdmFailure: 'Cliente/UpdateCliente_Adm_FAILURE',

    RegisterSuccess: 'AUTH/Register_SUCCESS',
    RegisterFailure: 'AUTH/Register_FAILURE',

}

const initialState = {
    error: null,
    clientes: [],
    page: 1,
    rowsPerPage: 10,
    total: 0,
    showNewCliente: null
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.clearError:
            return Object.assign(state, { error: null })

        case TYPES.FetchClienteSuccess:
            return { ...state, ...action.payload }
        case TYPES.FetchClienteFailure:
            return { ...state, ...action.error }

        case TYPES.ShowClienteSuccess:
            return { ...state, ...action.payload }
        case TYPES.ShowClienteFailure:
            return { ...state, ...action.error }

        case TYPES.UpdateClienteAdmSuccess:
            return { ...state, ...action.payload }
        case TYPES.UpdateClienteAdmFailure:
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
export const fetchClientes = (page = 1, rowsPerPage = 10, search = "") => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    console.log(page = 1, rowsPerPage = 10, search)

    let { token } = getState().auth
    console.log(search)
    if (token) {
        var promise1 = new Promise(async (resolve, reject) => {
            try {
                let result = await Api.fetchClientes(token.token, page, rowsPerPage, search)
                console.log(result)
                dispatch({
                    type: TYPES.FetchClienteSuccess,
                    payload: {
                        clientes: result.data,
                        page: result.page,
                        rowsPerPage: result.perPage,
                        total: result.total
                    }
                });
                resolve(result)
            } catch (error) {
                dispatch({
                    type: TYPES.FetchClienteFailure,
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

export const ClienteShow = (id) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.showCliente(token.token, id)
            dispatch({
                type: TYPES.ShowClienteSuccess,
                payload: {
                    showNewCliente: user
                }
            })
            resolve()
        } catch (error) {
            dispatch({
                type: TYPES.ShowClienteFailure,
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
export const UpdateClienteAdm = ({ nome, email, image, id }) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.updateCliente(token.token, { nome, email, image }, id)
            dispatch({
                type: TYPES.UpdateClienteAdmSuccess,
                payload: {
                    user
                }
            })
            resolve(user)
        } catch (error) {
            dispatch({
                type: TYPES.UpdateClienteAdmFailure,
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
export const registerCliente = ({ username, email, password }) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    let body = {
        username,
        email,
        password
    }
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let { token } = getState().auth
            let result = await Api.registerCliente(token.token, body)
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