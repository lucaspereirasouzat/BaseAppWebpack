import Api from "services/Api";


const TYPES = {
    clearError: 'Notification/CLEAR_ERROR',

    FetchNotificationSuccess: 'Notification/FetchNotification_SUCCESS',
    FetchNotificationFailure: 'Notification/FetchNotification_FAILURE',

    ShowNotificationSuccess: 'Notification/ShowNotification_SUCCESS',
    ShowNotificationFailure: 'Notification/ShowNotification_FAILURE',

    UpdateNotificationAdmSuccess: 'Notification/UpdateNotification_Adm_SUCCESS',
    UpdateNotificationAdmFailure: 'Notification/UpdateNotification_Adm_FAILURE',

    RegisterSuccess: 'AUTH/Register_SUCCESS',
    RegisterFailure: 'AUTH/Register_FAILURE',

}

const initialState = {
    error: null,
    notifications: [],
    page: 1,
    rowsPerPage: 10,
    total: 0,
    showNewNotification: null
}


const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.clearError:
            return Object.assign(state, { error: null })

        case TYPES.FetchNotificationSuccess:
            return { ...state, ...action.payload }
        case TYPES.FetchNotificationFailure:
            return { ...state, ...action.error }

        case TYPES.ShowNotificationSuccess:
            return { ...state, ...action.payload }
        case TYPES.ShowNotificationFailure:
            return { ...state, ...action.error }

        case TYPES.UpdateNotificationAdmSuccess:
            return { ...state, ...action.payload }
        case TYPES.UpdateNotificationAdmFailure:
            return { ...state, ...action.error }

        case TYPES.RegisterSuccess:
            return { ...state, ...action.payload }
        case TYPES.RegisterFailure:
            return { ...state, ...action.error }

        default:
            return state
    }
}

export default notificationsReducer;

/**
 * Pega todos os usuarios do sistema
 */
export const fetchNotifications = (page = 0, rowsPerPage = 10, search = "") => async (dispatch, getState) => {
    dispatch({ type: 'Notification/CLEAR_ERROR' })
    //console.log(page = 1, rowsPerPage = 10, search)

    let { token } = getState().auth
    console.log(search)
    if (token) {
        var promise1 = new Promise(async (resolve, reject) => {
            try {
                let result = await Api.MyNotifications(token.token, page, rowsPerPage, search)

                let table = result.Table.map(({ UserID, ID, CreatedAt, ...props }) => {

                    return {
                        CreatedAt: new Date(CreatedAt).toLocaleDateString('pt-BR'),
                        ...props
                    }
                })

                dispatch({
                    type: TYPES.FetchNotificationSuccess,
                    payload: {
                        notifications: table,
                        page: result.Page,
                        rowsPerPage: result.RowsPerPage,
                        total: result.Total
                    }
                });
                resolve(result)
            } catch (error) {
                dispatch({
                    type: TYPES.FetchNotificationFailure,
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

export const NotificationShow = (id) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.showNotification(token.token, id)
            dispatch({
                type: TYPES.ShowNotificationSuccess,
                payload: {
                    showNewNotification: user
                }
            })
            resolve()
        } catch (error) {
            dispatch({
                type: TYPES.ShowNotificationFailure,
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
export const UpdateNotificationAdm = ({ nome, email, image, id }) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.updateNotification(token.token, { nome, email, image }, id)
            dispatch({
                type: TYPES.UpdateNotificationAdmSuccess,
                payload: {
                    user
                }
            })
            resolve(user)
        } catch (error) {
            dispatch({
                type: TYPES.UpdateNotificationAdmFailure,
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
export const registerNotification = ({ username, email, password }) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    let body = {
        username,
        email,
        password
    }
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let { token } = getState().auth
            let result = await Api.registerNotification(token.token, body)
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