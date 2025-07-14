import { getSession } from '../utils/session';

const Dashboard = {
    render: async () => {
        const session = getSession();
        if (!session) {
            // Este chequeo es una doble seguridad, el router ya debería haberlo manejado
            window.location.hash = '/login';
            return `<div>Redirigiendo...</div>`;
        }

        const view = `
            <div class="p-8">
                <h1 class="text-3xl font-bold text-gray-800">Bienvenido, ${session.name}</h1>
                <p class="mt-2 text-gray-600">Este es tu panel de control. Desde aquí podrás administrar tus eventos.</p>
                
                <!-- Aquí irán las estadísticas y la gestión de eventos -->
                <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-700">Eventos Activos</h3>
                        <p class="text-4xl font-bold text-blue-500 mt-2">0</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-700">Eventos Pasados</h3>
                        <p class="text-4xl font-bold text-gray-500 mt-2">0</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-700">Total de Asistentes</h3>
                        <p class="text-4xl font-bold text-green-500 mt-2">0</p>
                    </div>
                    ${session.role === 'admin' ? `
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-700">Panel de Admin</h3>
                        <p class="text-sm text-red-500 mt-2">Tienes permisos de administrador.</p>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        return view;
    },
    after_render: async () => {
        // Lógica futura del dashboard aquí
    }
};

export default Dashboard;
