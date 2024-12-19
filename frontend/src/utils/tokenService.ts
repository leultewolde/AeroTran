export const setToken = (token) => {
    localStorage.setItem('accessToken', token);
};

export const getToken = () => {
    return localStorage.getItem('accessToken');
};

export const removeToken = () => {
    localStorage.removeItem('accessToken');
};
