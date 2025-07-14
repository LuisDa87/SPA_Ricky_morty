const API = 'http://localhost:4000';

// --- GET ---
const getData = async (resource) => {
    const apiURL = `${API}${resource}`;
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        // Si el recurso es singular (ej. /events/1), json-server devuelve un objeto. Lo metemos en un array para consistencia.
        const data = await response.json();
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error('Error en getData:', error.message);
        return [];
    }
};

// --- POST ---
export const postData = async (resource, body) => {
    const apiURL = `${API}${resource}`;
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error en postData:', error.message);
        return null;
    }
};

// --- PUT ---
export const putData = async (resource, body) => {
    const apiURL = `${API}${resource}`;
    try {
        const response = await fetch(apiURL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error en putData:', error.message);
        return null;
    }
};

// --- DELETE ---
export const deleteData = async (resource) => {
    const apiURL = `${API}${resource}`;
    try {
        const response = await fetch(apiURL, { method: 'DELETE' });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return true; // Éxito
    } catch (error) {
        console.error('Error en deleteData:', error.message);
        return false; // Fallo
    }
};

export default getData;
