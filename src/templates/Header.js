import { getSession, clearSession } from '../utils/session';

const Header = {
    render: async () => {
        const session = getSession();

        // --- Vista para Visitantes (sin sesión) ---
        const visitorNav = `
            <div class="flex items-center space-x-4">
                <a href="#/login" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                    Iniciar Sesión
                </a>
                <a href="#/register" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                    Registrarse
                </a>
            </div>
        `;

        // --- Vista para usuarios con rol "register" ---
        const registerNav = `
            <div class="flex items-center space-x-4">
                <span class="text-gray-300">Hola, ${session ? session.name : ''}</span>
                <a href="#/create-event" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">Crear Evento</a>
                <a href="#/my-events" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">Mis Eventos</a>
                <a href="#/my-subscriptions" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">Mis Suscripciones</a>
                <a href="#" id="logout-button" class="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition">Salir</a>
            </div>
        `;

        // --- Vista para usuarios con rol "admin" ---
        const adminNav = `
            <div class="flex items-center space-x-4">
                <span class="text-gray-300 font-semibold">Hola, ${session ? session.name : ''} (Admin)</span>
                <a href="#/create-event" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">Crear Evento</a>
                <a href="#/admin/events" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">Administrar Eventos</a>
                <a href="#/admin/dashboard" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">Dashboard</a>
                <a href="#" id="logout-button" class="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition">Salir</a>
            </div>
        `;
        
        let navContent;
        if (!session) {
            navContent = visitorNav;
        } else if (session.role === 'admin') {
            navContent = adminNav;
        } else if (session.role === 'register') {
            navContent = registerNav;
        } else {
            navContent = visitorNav; // Por seguridad, si hay un rol desconocido, se trata como visitante
        }

        const view = `
            <nav class="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <a href="#/" class="font-bold text-2xl tracking-wider">EVENTOS.CO</a>
                        </div>
                        ${navContent}
                    </div>
                </div>
            </nav>
        `;
        return view;
    },
    after_render: async () => {
        // El listener para el botón de logout solo se añade si el botón existe en el DOM
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                clearSession();
            });
        }
    }
};

export default Header;
