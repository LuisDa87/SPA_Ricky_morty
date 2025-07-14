import getData from '../utils/getData';
import { deleteData } from '../utils/getData';
import { getSession } from '../utils/session';

const MyEvents = {
    render: async () => {
        const session = getSession();
        if (!session) return `<div>Acceso denegado</div>`;

        // Obtenemos todos los eventos y los filtramos por el ID del usuario en sesión
        const allEvents = await getData('/events');
        const myEvents = allEvents.filter(event => event.userId === session.id);
        
        return `
            <div class="container mx-auto px-4 py-12">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">Mis Eventos Creados</h1>
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
                                <th class="px-4 py-3 text-left">Asistentes</th>
                                <th class="px-4 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700">
                            ${myEvents.length > 0 ? myEvents.map(event => `
                                <tr class="border-b hover:bg-gray-100">
                                    <td class="px-4 py-3">${event.name}</td>
                                    <td class="px-4 py-3">${new Date(event.date).toLocaleString('es-ES')}</td>
                                    <td class="px-4 py-3">${event.attendees.length} / ${event.capacity}</td>
                                    <td class="px-4 py-3 text-center">
                                        <a href="#/edit-event/${event.id}" class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-lg mr-2">Editar</a>
                                        <button data-id="${event.id}" class="delete-btn bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-lg">Eliminar</button>
                                    </td>
                                </tr>
                            `).join('') : `<tr><td colspan="4" class="text-center p-6">Aún no has creado ningún evento.</td></tr>`}
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
                if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
                    await deleteData(`/events/${eventId}`);
                    window.location.reload(); 
                }
            });
        });
    }
};

export default MyEvents;
