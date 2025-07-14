export const saveSession = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getSession = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const clearSession = () => {
    localStorage.removeItem('user');
    // Opcional: podrías añadir aquí lógica para desloguear
    window.location.hash = '/login';
};