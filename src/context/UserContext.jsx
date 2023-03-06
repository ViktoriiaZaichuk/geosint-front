import React from 'react'
import { storeData, removeData } from '../utils/secureStore'

export const UserContext = React.createContext()

const UserProvider = ({ children }) => {
    const [user, dispatch] = React.useReducer(userReducer, initialState)

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

const initialState = {
    id: '',
    username: '',
    avatar: '',
    global_score: 0,
    login: null,
    token: '',
    loading: false,
    errorMessage: null,
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
           const loginSuccessState =  {
                ...state,
                id: action.payload,
                login: true,
                loading: false,
                errorMessage: null,
            }
            storeData('currentUser', loginSuccessState)
            return loginSuccessState
        case 'GET_USER':
            const newState = {
                ...state,
                username: action.payload.username,
                avatar: action.payload.avatar,
                global_score: action.payload.global_score,
                errorMessage: null,
            }
            storeData('currentUser', newState)
            return newState;
        case 'UPDATE_USER':
            const updateUserState = {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                errorMessage: null,
            }
            storeData('currentUser', updateUserState)
            return updateUserState
        case 'UPDATE_AVATAR':
            const updateAvatarState = {
                ...state,
                avatar: action.payload,
                errorMessage: null,
            }
            storeData('currentUser', updateAvatarState)
            return updateAvatarState
        case 'GET_TOKEN':
            const tokenState = {
                ...state,
                token: action.payload,
                errorMessage: null,
            }
            storeData('currentUser', tokenState)
            return tokenState
        case 'REQUEST_LOGIN':
            return {
                ...state,
                loading: true,
                errorMessage: null,
            }
        case 'LOGOUT':
            const logoutState =  {
                ...state,
                login: false,
                token: '',
                errorMessage: null,
            }
            removeData('currentUser')
            return logoutState
        case 'LOGIN_ERROR':
            return {
                ...state,
                loading: false,
                errorMessage: action.error,
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

export default UserProvider
