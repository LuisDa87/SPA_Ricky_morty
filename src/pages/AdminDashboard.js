import getData from '../utils/getData';

const AdminDashboard = {
    render: async () => {
        const events = await getData('/events');
        const users = await getData('/users');

        const totalEvents = events.length;
        const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
        const totalUsers = users.filter(user => user.role === 'register').length;

        const view = `
            <div class="p-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard de Administración</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-700">Total de Eventos</h3>
                        <p class="text-5xl font-bold text-blue-500 mt-2">${totalEvents}</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-700">Eventos Próximos</h3>
                        <p class="text-5xl font-bold text-green-500 mt-2">${upcomingEvents}</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-700">Usuarios Registrados</h3>
                        <p class="text-5xl font-bold text-purple-500 mt-2">${totalUsers}</p>
                    </div>
                </div>
            </div>
        `;
        return view;
    },
    after_render: async () => {}
};

export default AdminDashboard;
