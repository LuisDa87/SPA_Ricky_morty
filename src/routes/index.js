import Header from '../templates/Header';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error404 from '../pages/Error404';
import AdminDashboard from '../pages/AdminDashboard';
import AdminEvents from '../pages/AdminEvents';
import EventForm from '../pages/EventForm';
import MyEvents from '../pages/MyEvents';
import MySubscriptions from '../pages/MySubscriptions';

import getHash from '../utils/getHash';
import resolveRoutes from '../utils/resolveRoutes';
import { getSession } from '../utils/session';

const routes = {
    '/': HomePage,
    '/login': Login,
    '/register': Register,
    // Rutas Admin
    '/admin/dashboard': AdminDashboard,
    '/admin/events': AdminEvents,
    // Rutas Register
    '/my-events': MyEvents,
    '/my-subscriptions': MySubscriptions,
    // Rutas Compartidas (Protegidas)
    '/create-event': EventForm,
    '/edit-event/:id': EventForm,
};

const router = async () => {
    const header = document.getElementById('header');
    const content = document.getElementById('content');
    
    header.innerHTML = await Header.render();
    await Header.after_render();

    let hash = getHash();
    let route = await resolveRoutes(hash);
    
    // --- GUARDIÁN DE RUTAS MEJORADO ---
    const session = getSession();
    const adminRoutes = ['/admin/dashboard', '/admin/events'];
    const registerRoutes = ['/my-events', '/my-subscriptions'];
    const sharedProtectedRoutes = ['/create-event', '/edit-event/:id'];

    let authorized = true;
    let requiredRole = '';

    if (adminRoutes.includes(route)) {
        if (!session || session.role !== 'admin') {
            authorized = false;
            requiredRole = 'Administrador';
        }
    } else if (registerRoutes.includes(route)) {
        if (!session || session.role !== 'register') {
            authorized = false;
            requiredRole = 'Usuario Registrado';
        }
    } else if (sharedProtectedRoutes.includes(route)) {
        if (!session || (session.role !== 'admin' && session.role !== 'register')) {
            authorized = false;
            requiredRole = 'Administrador o Usuario Registrado';
        }
    }
    
    if (!authorized) {
        alert(`Acceso denegado. Necesitas ser ${requiredRole} para acceder a esta página.`);
        window.location.hash = '/';
        return;
    }

    let page = routes[route] ? routes[route] : Error404;

    content.innerHTML = await page.render();
    if (page.after_render) {
        await page.after_render();
    }
};

export default router;
