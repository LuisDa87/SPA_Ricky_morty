import { getSession } from '../utils/session';
import { postData, putData } from '../utils/getData';
import getHash from '../utils/getHash';
import getData from '../utils/getData';

const EventForm = {
    render: async () => {
        const eventId = getHash();
        let event = {};
        let pageTitle = 'Crear Nuevo Evento';

        if (eventId && !isNaN(eventId)) {
            const events = await getData(`/events/${eventId}`);
            if (events.length > 0) {
                event = events[0];
                pageTitle = 'Editar Evento';
            }
        }
        
        const categories = ['Cultural', 'Deportivo', 'Social', 'Empresarial', 'Académico'];

        return `
            <div class="container mx-auto px-4 py-12 max-w-3xl">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">${pageTitle}</h1>
                <form id="event-form" class="bg-white p-8 rounded-lg shadow-lg">
                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 font-bold mb-2">Nombre del Evento</label>
                        <input type="text" id="name" name="name" value="${event.name || ''}" class="w-full p-2 border border-gray-300 rounded" required>
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 font-bold mb-2">Descripción</label>
                        <textarea id="description" name="description" rows="4" class="w-full p-2 border border-gray-300 rounded" required>${event.description || ''}</textarea>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="mb-4">
                            <label for="date" class="block text-gray-700 font-bold mb-2">Fecha y Hora</label>
                            <input type="datetime-local" id="date" name="date" value="${event.date ? new Date(event.date).toISOString().substring(0, 16) : ''}" class="w-full p-2 border border-gray-300 rounded" required>
                        </div>
                        <div class="mb-4">
                            <label for="category" class="block text-gray-700 font-bold mb-2">Categoría</label>
                            <select id="category" name="category" class="w-full p-2 border border-gray-300 rounded" required>
                                ${categories.map(cat => `<option value="${cat}" ${event.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="mb-4">
                            <label for="image" class="block text-gray-700 font-bold mb-2">URL de la Imagen</label>
                            <input type="url" id="image" name="image" value="${event.image || ''}" class="w-full p-2 border border-gray-300 rounded" required>
                        </div>
                        <div class="mb-4">
                            <label for="capacity" class="block text-gray-700 font-bold mb-2">Capacidad (Nº de Asistentes)</label>
                            <input type="number" id="capacity" name="capacity" value="${event.capacity || 0}" min="0" class="w-full p-2 border border-gray-300 rounded" required>
                        </div>
                    </div>
                    <div class="mt-6">
                        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                            ${eventId && !isNaN(eventId) ? 'Actualizar Evento' : 'Guardar Evento'}
                        </button>
                    </div>
                </form>
            </div>
        `;
    },
    after_render: async () => {
        const eventId = getHash();
        const session = getSession();
        const form = document.getElementById('event-form');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const eventData = {
                userId: session.id,
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                date: document.getElementById('date').value,
                category: document.getElementById('category').value,
                image: document.getElementById('image').value,
                capacity: parseInt(document.getElementById('capacity').value, 10),
                attendees: eventId && !isNaN(eventId) ? (await getData(`/events/${eventId}`))[0].attendees : []
            };

            let success = false;
            if (eventId && !isNaN(eventId)) {
                const result = await putData(`/events/${eventId}`, eventData);
                if (result) {
                    alert('¡Evento actualizado con éxito!');
                    success = true;
                }
            } else {
                const result = await postData('/events', eventData);
                if (result) {
                    alert('¡Evento creado con éxito!');
                    success = true;
                }
            }
            
            if (success) {
                // Redirección inteligente según el rol del usuario
                window.location.hash = session.role === 'admin' ? '/admin/events' : '/my-events';
            } else {
                alert('Ocurrió un error. Por favor, inténtalo de nuevo.');
            }
        });
    }
};

export default EventForm;
