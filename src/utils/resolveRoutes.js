/**
 * Transforma una ruta de la URL en una plantilla de ruta que coincida con nuestro objeto de rutas.
 * @param {string} route - La ruta obtenida de getHash(), ej: '/edit-event/123'.
 * @returns {string} La plantilla de ruta, ej: '/edit-event/:id'.
 */
const resolveRoutes = (route) => {
    // Si la ruta tiene menos de 3 caracteres, probablemente es la raíz '/'.
    if (route.length < 3) {
        return route;
    }
    // Divide la ruta en segmentos. Ej: '/admin/events' -> ['', 'admin', 'events']
    const segments = route.split('/');
    
    // Comprueba si el último segmento es un número.
    // Si es así, asumimos que es una ruta con un ID dinámico.
    if (!isNaN(segments[segments.length - 1])) {
        // Reconstruimos la ruta usando el placeholder ':id'.
        // Ej: de '/edit-event/123' a '/edit-event/:id'
        return `/${segments[1]}/:id`;
    }
    
    // Si no es un ID, es una ruta estática como '/admin/dashboard'.
    return route;
};

export default resolveRoutes;
