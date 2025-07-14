import getData from '../utils/getData';
import { getSession } from '../utils/session';
import { putData } from '../utils/getData';

const MySubscriptions = {
    render: async () => {
        const session = getSession();
        if (!session) return `<div>Acceso denegado</div>`;

        const allEvents = await getData('/events');
        // Filtramos los eventos para encontrar aquellos donde el ID del usuario está en el array de asistentes
        const subscribedEvents = allEvents.filter(event => event.attendees.includes(session.id));

        return `
            <div class="container mx-auto px-4 py-12">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">Mis Suscripciones</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${subscribedEvents.length > 0 ? subscribedEvents.map(event => `
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="${event.image}" alt="${event.name}" class="w-full h-48 object-cover">
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-gray-900 mb-2">${event.name}</h3>
                                <p class="text-gray-600 text-sm mb-4">${new Date(event.date).toLocaleString('es-ES')}</p>
                                <button data-event-id="${event.id}" class="cancel-subscription-btn w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition">
                                    Cancelar Suscripción
                                </button>
                            </div>
                        </div>
                    `).join('') : `<p class="col-span-full text-center text-gray-600">No estás inscrito en ningún evento todavía.</p>`}
                </div>
            </div>
        `;
    },
    after_render: async () => {
        const cancelButtons = document.querySelectorAll('.cancel-subscription-btn');
        const session = getSession();

        cancelButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                if (!session || session.role !== 'register') return;
                
                const eventId = e.target.dataset.eventId;
                if (confirm('¿Estás seguro de que deseas cancelar tu inscripción a este evento?')) {
                    const eventData = await getData(`/events/${eventId}`);
                    const event = eventData[0];
                    
                    if (event) {
                        // Filtramos para crear un nuevo array de asistentes sin el ID del usuario actual
                        event.attendees = event.attendees.filter(attendeeId => attendeeId !== session.id);
                        await putData(`/events/${eventId}`, event);
                        alert('Inscripción cancelada.');
                        window.location.reload();
                    }
                }
            });
        });
    }
};

export default MySubscriptions;
