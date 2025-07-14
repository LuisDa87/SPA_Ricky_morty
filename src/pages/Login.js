import { default as getData } from '../utils/getData';
import { saveSession } from '../utils/session';

const Login = {
    render: async () => {
        const view = `
            <div class="min-h-screen bg-gray-100 flex items-center justify-center">
                <div class="bg-white shadow-lg rounded-lg flex w-full max-w-4xl overflow-hidden">
                    <!-- Columna Izquierda con Imagen y Texto -->
                    <div class="hidden md:flex w-1/2 bg-cover bg-center p-12 text-white" style="background-image: url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?q=80&w=2069&auto=format&fit=crop')">
                        <div class="flex flex-col justify-between">
                            <div>
                                <h2 class="text-4xl font-bold">Welcome Back</h2>
                                <p class="mt-4 text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                            <div class="flex space-x-4">
                                <a href="#" class="hover:opacity-75">FB</a>
                                <a href="#" class="hover:opacity-75">TW</a>
                                <a href="#" class="hover:opacity-75">IG</a>
                            </div>
                        </div>
                    </div>
                    <!-- Columna Derecha con Formulario -->
                    <div class="w-full md:w-1/2 p-8 md:p-12">
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Sign in</h2>
                        <form id="login-form">
                            <div class="mb-4">
                                <label for="login-email" class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                <input type="email" id="login-email" name="email" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" required>
                            </div>
                            <div class="mb-6">
                                <label for="login-password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input type="password" id="login-password" name="password" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="******************" required>
                            </div>
                            <div class="flex items-center justify-start mb-6">
                                <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300">
                                    Sign in now
                                </button>
                                <!-- El botón de "Lost your password?" ha sido eliminado -->
                            </div>
                        </form>
                        <hr class="my-6">
                        <p class="text-center text-gray-600">
                            Don't have an account? 
                            <a href="#/register" class="font-bold text-orange-500 hover:text-orange-700">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
        return view;
    },
    after_render: async () => {
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.elements.email.value;
            const password = e.target.elements.password.value;
            
            const users = await getData(`/users?email=${email}&password=${password}`);

            if (users.length > 0) {
                saveSession(users[0]);
                window.location.hash = '/';
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        });
    }
};

export default Login;
