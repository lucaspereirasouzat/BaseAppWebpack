import Api from "../../services/Api";


const TYPES = {
    clearError: 'Empresa/CLEAR_ERROR',

    FetchEmpresaSuccess: 'Empresa/FetchEmpresa_SUCCESS',
    FetchEmpresaFailure: 'Empresa/FetchEmpresa_FAILURE',

    ShowEmpresaSuccess: 'Empresa/ShowEmpresa_SUCCESS',
    ShowEmpresaFailure: 'Empresa/ShowEmpresa_FAILURE',

    UpdateEmpresaSuccess: 'Empresa/UpdateEmpresa__SUCCESS',
    UpdateEmpresaFailure: 'Empresa/UpdateEmpresa__FAILURE',

    RegisterSuccess: 'Empresa/Register_SUCCESS',
    RegisterFailure: 'Empresa/Register_FAILURE',

    DeleteSuccess: 'Empresa/Delete_SUCCESS',
    DeleteFailure: 'Empresa/Delete_FAILURE',

}

const initialState = {
    error: null,
    empresas: [],
    page: 1,
    rowsPerPage: 10,
    total: 0,
    showNewEmpresa: null
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.clearError:
            return Object.assign(state, { error: null })

        case TYPES.FetchEmpresaSuccess:
            return { ...state, ...action.payload }
        case TYPES.FetchEmpresaFailure:
            return { ...state, ...action.error }

        case TYPES.ShowEmpresaSuccess:
            return { ...state, ...action.payload }
        case TYPES.ShowEmpresaFailure:
            return { ...state, ...action.error }

        case TYPES.UpdateEmpresaSuccess:
            return { ...state, ...action.payload }
        case TYPES.UpdateEmpresaFailure:
            return { ...state, ...action.error }

        case TYPES.RegisterSuccess:
            return { ...state, ...action.payload }
        case TYPES.RegisterFailure:
            return { ...state, ...action.error }

        case TYPES.DeleteSuccess:
            return { ...state, ...action.payload }
        case TYPES.DeleteFailure:
            return { ...state, ...action.error }

        default:
            return state
    }
}

export default usersReducer;

/**
 * Pega todos os usuarios do sistema
 */
export const fetchEmpresas = (page = 1, rowsPerPage = 10, search) => async (dispatch, getState) => {
    dispatch({ type: 'Empresa/CLEAR_ERROR' })
    //console.log(page = 1, rowsPerPage = 10, search)

    let { token } = getState().auth
    console.log(search)
    if (token) {
        var promise1 = new Promise(async (resolve, reject) => {
            try {
                let result = await Api.fetchEmpresas(token.token, page, rowsPerPage, search)
                console.log(result)
                dispatch({
                    type: TYPES.FetchEmpresaSuccess,
                    payload: {
                        empresas: result.data,
                        page: result.page,
                        rowsPerPage: result.perPage,
                        total: result.total
                    }
                });
                resolve(result)
            } catch (error) {
                dispatch({
                    type: TYPES.FetchEmpresaFailure,
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

export const EmpresaShow = (id) => async (dispatch, getState) => {
    dispatch({ type: 'Empresa/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.showEmpresa(token.token, id)
            dispatch({
                type: TYPES.ShowEmpresaSuccess,
                payload: {
                    showNewEmpresa: user
                }
            })
            resolve()
        } catch (error) {
            dispatch({
                type: TYPES.ShowEmpresaFailure,
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
export const UpdateEmpresa = ({ nome,
    cnpj,
    nfunc,
    cnae,
    enquadramentoJuridico,
    endereco,
    telefone,
    email,
    redes,
    segmento,
    image, id }) => async (dispatch, getState) => {
        dispatch({ type: 'Empresa/CLEAR_ERROR' })
        {


        }
        let { token } = getState().auth
        var promise1 = new Promise(async (resolve, reject) => {
            try {
                let user = await Api.updateEmpresa(token.token, { nome, email, image }, id)
                dispatch({
                    type: TYPES.UpdateEmpresaSuccess,
                    payload: {
                        user
                    }
                })
                resolve(user)
            } catch (error) {
                dispatch({
                    type: TYPES.UpdateEmpresaFailure,
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
export const registerEmpresa = ({ nome, cnpj }) => async (dispatch, getState) => {
    dispatch({ type: 'Empresa/CLEAR_ERROR' })
    let body = {
        nome, cnpj
    }
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let { token } = getState().auth
            let result = await Api.registerEmpresa(token.token, body)
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

/**
 * Faz o cadastro do mentor
 */
export const deleteEmpresa = (id) => async (dispatch, getState) => {
    dispatch({ type: 'Empresa/CLEAR_ERROR' })

    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let { token } = getState().auth
            let result = await Api.destroyEmpresa(token.token, id)
            dispatch({
                type: TYPES.DeleteSuccess,
                payload: {
                    result
                }
            })
            resolve({
                ...result
            })
        } catch (error) {
            console.log('error', error)
            dispatch({
                type: TYPES.DeleteFailure,
                error: { error: error.response.data }
            })
            reject(error.response.data)
        }
    })
    return promise1;
}