import getData from "../utils/getData";


const Home = async () => {
    const characters = await getData(); // no enviamos un id por eso nos retorna todos los datos de la api
    const view = `
        <div class="Characters">
            ${characters.results.map(character => `
                <article class= "Character-item">
                    <a href="#/${character.id}/">
                        <img src="${character.image}" alt="${characters.image}">
                        <h2>${character.name}</h2>
                        <h3>${character.created}</h3>
                    </a>
                </article>
            `).join('')}
        </div>
   `;
   return view;
   // .join se utiliza para retornar un bloque de HTML que pueda ser iterado, genera un arreglo 
}

export default Home;