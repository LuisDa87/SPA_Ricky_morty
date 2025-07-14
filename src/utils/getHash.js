/**
 * Obtiene el fragmento de la URL (hash) de forma limpia.
 * @returns {string} La ruta actual, ej: '/admin/dashboard' o '/edit-event/123'.
 */
const getHash = () => {
    // location.hash devuelve algo como '#/admin/dashboard'.
    // .slice(1) elimina el primer carácter ('#').
    // .toLocaleLowerCase() convierte todo a minúsculas para consistencia.
    // || '/' asegura que si no hay hash, se devuelva la ruta raíz.
    return location.hash.slice(1).toLocaleLowerCase() || '/';
}

export default getHash;