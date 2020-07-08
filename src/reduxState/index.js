import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

// import logger from "redux-logger";
import { authReducer, usersReducer, notificationReducer, logReducer } from "./ducks";
// import createEncryptor from 'redux-persist-transform-encrypt'

export default function () {

    const encryptor = require('redux-persist-transform-encrypt').default({
        secretKey: '4e479c0b44e0b78c66d476631a0b8de6',
        onError: function (error) {
            // Handle the error.
            alert(error)
        }
    })

    let storage = require('localforage')

    const persistConfig = {
        key: 'root',
        storage,
        whitelist: [''],
        transforms: [encryptor]
    }

    const usersConfig = {
        key: 'users',
        storage,
        whitelist: [''],
        transforms: [encryptor]
    }
    const notificationConfig = {
        key: 'notification',
        storage,
        whitelist: [''],
        transforms: [encryptor]
    }

    const authConfig = {
        key: 'auth',
        storage,
        whitelist: ['token', 'user'],
        transforms: [encryptor]
    }

    const logConfig = {
        key: 'log',
        storage,
        whitelist: [],
        transforms: [encryptor]
    }

    let reducers = combineReducers({
        auth: persistReducer(authConfig, authReducer),
        users: persistReducer(usersConfig, usersReducer),
        notification: persistReducer(notificationConfig, notificationReducer),
        log: persistReducer(logConfig, logReducer),
        // app: appReducer,
    })

    const persistedReducer = persistReducer(persistConfig, reducers)

    let store = createStore(persistedReducer, applyMiddleware(require("redux-thunk").default, require("redux-logger").default))
    let persistor = persistStore(store)
    return { store, persistor }
}