const resolveRoutes = (route) => {
  // Si la ruta es la página de inicio, la devolvemos tal cual.
  if (route === '/') {
    return route;
  }
  // Comprobamos si la ruta es un número.
  // isNaN() significa "Is Not a Number" (No es un número).
  // Si la ruta NO es "No un número" (o sea, si ES un número), es un ID.
  if (!isNaN(route)) {
    return '/:id';
  }
  // Si no es la raíz y no es un número, es una ruta con nombre.
  return `/${route}`;
};

export default resolveRoutes;