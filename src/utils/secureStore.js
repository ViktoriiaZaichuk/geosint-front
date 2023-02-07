import secureLocalStorage from "react-secure-storage";

export const storeData = (key, value) => {
    const jsonValue = JSON.stringify(value);
    return secureLocalStorage.setItem(key, jsonValue);
}

export const getData = (key) => {
    const jsonValue = secureLocalStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export const removeData = (key) => {
    return secureLocalStorage.removeItem(key);
}