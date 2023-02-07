import React from "react";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, dispatch] = React.useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

const initialState = {
    id: "",
    username: "",
    avatar: "",
    global_score: 0,
    login: null,
    token: "",
    loading: false,
    errorMessage: null,
}

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                id: action.payload,
                login: true,
                loading: false,
                errorMessage: null
            }
        case "GET_USER":
            return {
                ...state,
                username: action.payload.username,
                avatar: action.payload.avatar,
                global_score: action.payload.global_score,
                errorMessage: null
            }
        case "GET_TOKEN":
            return {
                ...state,
                token: action.payload,
                errorMessage: null
            }
        case "REQUEST_LOGIN":
            return {
                ...state,
                loading: true,
                errorMessage: null
            }
        case "LOGOUT":
            return {
                ...state,
                login: false,
                token: "",
                errorMessage: null
            }
        case "LOGIN_ERROR":
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