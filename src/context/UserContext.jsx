import React from "react";

const UserContext = React.createContext();

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
    login: null,
    token: "",
    firstName: "",
    lastName: "",
    loading: false,
    errorMessage: null,
}

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                id: action.payload._id,
                login: action.payload.isLoggedIn,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                loading: false,
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

export { UserContext, UserProvider };