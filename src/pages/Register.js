import { postData, default as getData } from '../utils/getData';

const Register = {
    render: async () => {
        // El HTML sigue siendo el mismo.
        const view = `
            <div class="min-h-screen bg-gray-100 flex items-center justify-center">
                <div class="bg-white shadow-lg rounded-lg flex w-full max-w-4xl overflow-hidden">
                    <!-- Columna Izquierda con Imagen y Texto -->
                    <div class="hidden md:flex w-1/2 bg-cover bg-center p-12 text-white" style="background-image: url('https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1974&auto=format&fit=crop');">
                        <div class="flex flex-col justify-center">
                            <h2 class="text-4xl font-bold">Create your Account</h2>
                            <p class="mt-4 text-lg">Join our community and start managing your events like a pro. It's free and only takes a minute.</p>
                        </div>
                    </div>
                    <!-- Columna Derecha con Formulario -->
                    <div class="w-full md:w-1/2 p-8 md:p-12">
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Sign up</h2>
                        <form id="register-form">
                            <div class="mb-4">
                                <label for="register-name" class="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                                <input type="text" id="register-name" name="name" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <div class="mb-4">
                                <label for="register-email" class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                <input type="email" id="register-email" name="email" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <div class="mb-6">
                                <label for="register-password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input type="password" id="register-password" name="password" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <div class="flex items-center justify-between mb-6">
                                <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300">
                                    Create Account
                                </button>
                            </div>
                        </form>
                        <hr class="my-6">
                        <p class="text-center text-gray-600">
                            Already have an account? 
                            <a href="#/login" class="font-bold text-orange-500 hover:text-orange-700">Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
        return view;
    },
    after_render: async () => {
        const registerForm = document.getElementById('register-form');
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newUser = {
                name: e.target.elements.name.value,
                email: e.target.elements.email.value,
                password: e.target.elements.password.value,
                role: 'register' // <-- ¡CAMBIO IMPORTANTE! Asignamos el rol 'register'.
            };

            const existingUser = await getData(`/users?email=${newUser.email}`);
            if (existingUser.length > 0) {
                alert('Este correo electrónico ya está registrado.');
                return;
            }

            const createdUser = await postData('/users', newUser);
            if (createdUser) {
                alert('¡Registro exitoso! Ahora serás redirigido para iniciar sesión.');
                window.location.hash = '/login';
            } else {
                alert('Ocurrió un error durante el registro. Por favor, intenta de nuevo.');
            }
        });
    }
};

export default Register;
