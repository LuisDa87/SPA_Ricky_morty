import getData from '../utils/getData';
import { getSession } from '../utils/session';
import { putData } from '../utils/getData';

const HomePage = {
    render: async () => {
        const events = await getData('/events');
        const session = getSession();
        const categories = ['Cultural', 'Deportivo', 'Social', 'Empresarial', 'Académico'];

        // --- Función para renderizar el botón de acción del evento ---
        const renderEventAction = (event) => {
            if (session && session.role === 'register') {
                const isSubscribed = event.attendees.includes(session.id);
                const isFull = event.attendees.length >= event.capacity;

                if (isSubscribed) {
                    return `<span class="font-bold text-green-600">¡Inscrito!</span>`;
                }
                if (isFull) {
                    return `<span class="font-bold text-red-600">¡Lleno!</span>`;
                }
                return `<button data-event-id="${event.id}" class="subscribe-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition">Suscribirme</button>`;
            }
            // Para admin e invitados, mostramos la disponibilidad
            return `<span class="text-sm font-bold ${event.attendees.length >= event.capacity ? 'text-red-500' : 'text-green-500'}">
                        ${event.attendees.length >= event.capacity ? '¡Lleno!' : `${event.capacity - event.attendees.length} cupos`}
                    </span>`;
        };

        const view = `
            <!-- Hero Section -->
            <div class="relative h-96 bg-gray-800 text-white flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop" class="absolute w-full h-full object-cover opacity-50" alt="">
                <div class="relative z-10 text-center p-4">
                    <h1 class="text-5xl font-extrabold tracking-tight">DESCUBRE LOS MEJORES EVENTOS</h1>
                    <p class="mt-4 text-xl max-w-2xl mx-auto">Encuentra conciertos, conferencias, eventos deportivos y mucho más en tu ciudad.</p>
                    <a href="#events" class="mt-8 inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                        Explorar Eventos
                    </a>
                </div>
            </div>

            <!-- Secciones de Eventos por Categoría -->
            <div id="events" class="container mx-auto px-4 py-12">
                ${categories.map(category => {
                    const eventsInCategory = events.filter(event => event.category === category);
                    if (eventsInCategory.length === 0) return '';
                    return `
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-orange-500 pb-2 mb-8">${category}</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                ${eventsInCategory.map(event => `
                                    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                                        <img src="${event.image}" alt="${event.name}" class="w-full h-48 object-cover">
                                        <div class="p-6 flex flex-col flex-grow">
                                            <h3 class="text-xl font-bold text-gray-900 mb-2">${event.name}</h3>
                                            <p class="text-gray-600 text-sm mb-4">${new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            <p class="text-gray-700 mb-4 flex-grow">${event.description.substring(0, 100)}...</p>
                                            <div class="mt-auto flex justify-between items-center pt-4 border-t">
                                                <span class="text-sm font-semibold text-gray-800 bg-gray-200 px-3 py-1 rounded-full">${event.category}</span>
                                                ${renderEventAction(event)}
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    `;
                }).join('')}
            </div>
        `;
        return view;
    },
    after_render: async () => {
        const subscribeButtons = document.querySelectorAll('.subscribe-btn');
        const session = getSession();

        subscribeButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                if (!session || session.role !== 'register') return;

                const eventId = e.target.dataset.eventId;
                const eventData = await getData(`/events/${eventId}`);
                const event = eventData[0];

                if (event && !event.attendees.includes(session.id)) {
                    event.attendees.push(session.id);
                    const result = await putData(`/events/${eventId}`, event);
                    if (result) {
                        alert('¡Te has inscrito al evento con éxito!');
                        window.location.reload();
                    } else {
                        alert('Hubo un error al inscribirte. Inténtalo de nuevo.');
                    }
                }
            });
        });
    }
};

export default HomePage;
