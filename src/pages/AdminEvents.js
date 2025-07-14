import getData from '../utils/getData';
import { deleteData } from '../utils/getData';

const AdminEvents = {
    render: async () => {
        const events = await getData('/events');
        
        return `
            <div class="container mx-auto px-4 py-12">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">Administrar Eventos</h1>
                    <a href="#/create-event" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition">
                        + Crear Nuevo Evento
                    </a>
                </div>
                <div class="bg-white shadow-lg rounded-lg overflow-x-auto">
                    <table class="w-full table-auto">
                        <thead class="bg-gray-800 text-white">
                            <tr>
                                <th class="px-4 py-3 text-left">Nombre del Evento</th>
                                <th class="px-4 py-3 text-left">Fecha</th>
                                <th class="px-4 py-3 text-left">Categoría</th>
                                <th class="px-4 py-3 text-left">Capacidad</th>
                                <th class="px-4 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700">
                            ${events.map(event => `
                                <tr class="border-b hover:bg-gray-100">
                                    <td class="px-4 py-3">${event.name}</td>
                                    <td class="px-4 py-3">${new Date(event.date).toLocaleString('es-ES')}</td>
                                    <td class="px-4 py-3">${event.category}</td>
                                    <td class="px-4 py-3">${event.attendees.length} / ${event.capacity}</td>
                                    <td class="px-4 py-3 text-center">
                                        <a href="#/edit-event/${event.id}" class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-lg mr-2">Editar</a>
                                        <button data-id="${event.id}" class="delete-btn bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-lg">Eliminar</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    after_render: async () => {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const eventId = e.target.dataset.id;
                if (confirm('¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.')) {
                    await deleteData(`/events/${eventId}`);
                    // Forzar un re-renderizado para actualizar la lista
                    window.location.reload(); 
                }
            });
        });
    }
};

export default AdminEvents;
