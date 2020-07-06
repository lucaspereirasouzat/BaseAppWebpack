import { createStore, applyMiddleware, combineReducers } from 'redux'
import storage from 'localforage'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from "redux-thunk";
import logger from "redux-logger";
import { authReducer, usersReducer, notificationReducer, logReducer } from "./ducks";
import createEncryptor from 'redux-persist-transform-encrypt'


const encryptor = createEncryptor({
    secretKey: '4e479c0b44e0b78c66d476631a0b8de6',
    onError: function (error) {
        // Handle the error.
        alert(error)
    }
})

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



export default function () {

    let reducers = combineReducers({
        auth: persistReducer(authConfig, authReducer),
        users: persistReducer(usersConfig, usersReducer),
        notification: persistReducer(notificationConfig, notificationReducer),
        log: persistReducer(logConfig, logReducer),
        // app: appReducer,
    })

    const persistedReducer = persistReducer(persistConfig, reducers)
    let store = createStore(persistedReducer, applyMiddleware(thunk, logger))
    let persistor = persistStore(store)
    return { store, persistor }
}