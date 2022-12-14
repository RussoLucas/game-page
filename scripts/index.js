let DEFAULT_GAME_PAGE = 4;
const DEFAULT_GAMES_PER_PAGE = 8;
let DEFAULT_PLATFORM_PAGE = 1;
const DEFAULT_PLATFORMS_PER_PAGE = 3;
let DEFAULT_PUBLISHER_PAGE = 1;
const DEFAULT_PUBLISHERS_PER_PAGE = 3;


async function getGames(page, pageSize){
   try {
      const response = await fetch(`https://api.rawg.io/api/games?key=c0c2fae56ef54db2a862754390fd3b60&page=${page}&page_size=${pageSize}`);
      const {results} = await response.json();

      if(!response.ok) throw new Error("Not a 2xx response");

      return results;
   } catch (error) {
      console.error(error);
   }
}

async function getGameById(id){
   try {
      const response =  await fetch(`https://api.rawg.io/api/games/${id}?key=c0c2fae56ef54db2a862754390fd3b60`);
      
      const results = await response.json();

      if(!response.ok) throw new Error("Not a 2xx response");

      return results;
   } catch (error) {
      console.error(error);
   }
}

async function getPlatforms(page, pageSize){
   try {
      const response = await fetch(`https://api.rawg.io/api/platforms?key=c0c2fae56ef54db2a862754390fd3b60&page=${page}&page_size=${pageSize}`);
      const {results} = await response.json();

      if(!response.ok) throw new Error("Not a 2xx response");

      return results;
   } catch (error) {
      console.error(error);
   }
}

async function getDevelopers(page, pageSize){
   try {
      const response = await fetch(`https://api.rawg.io/api/developers?key=c0c2fae56ef54db2a862754390fd3b60&page=${page}&page_size=${pageSize}`);
      const {results} = await response.json();

      if(!response.ok) throw new Error("Not a 2xx response");

      return results;
   } catch (error) {
      console.error(error);
   }
}



function renderGames(games){
   const releases = document.getElementById("content-releases");
   let container = "";

   games.map(({name,  background_image, id, metacritic})=> {
      container += `
      <div>
         <p>${name}</p>
         <img src=${background_image}
            style="width: 100%; max-width: 100%; height: 200px; border-radius: 15px;"></img>    
         <a href="details.html?id=${id}">Details...</a>
      </div>`
   });

   releases.insertAdjacentHTML("beforeend", container);
}

function renderPlatforms(platforms){
   const platformsElement = document.getElementById("content-platforms");
   let container = "";

   platforms.map(({name,  image_background, id})=> {
      container += `
      <div id=${id} class="card">
         <h2>${name}</h2>
         <div>
            <img src=${image_background}
               style="width: 100%; height: 230px; border-radius: 15px;"></img>
            <div></div>
         </div>
         <br />
      </div>`
   });

   platformsElement.insertAdjacentHTML("beforeend", container);
}

async function loadMoreGames(){
   DEFAULT_GAME_PAGE++;

   const games = await getGames(DEFAULT_GAME_PAGE,DEFAULT_GAMES_PER_PAGE);

   renderGames(games);
}

async function loadMorePlatforms(){
   DEFAULT_PLATFORM_PAGE++;

   const platforms = await getPlatforms(DEFAULT_PLATFORM_PAGE,DEFAULT_PLATFORMS_PER_PAGE);

   renderPlatforms(platforms);
}

async function loadMorePublishers(){
   DEFAULT_PUBLISHER_PAGE++;

   const publishers = await getDevelopers(DEFAULT_PUBLISHER_PAGE,DEFAULT_PUBLISHERS_PER_PAGE);

   renderDevelopers(publishers);
}

function renderDevelopers(developers){
   const developersElement = document.getElementById("content-publishers");
   let container = "";

   developers.map(({name,  image_background, games,id})=> {
      container += `
      <div class="card">
      <h2>${name}</h2>
      <div>
         <img src=${image_background}
            style="width: 100%; height: 230px; border-radius: 15px;"></img>
         <div>
            <p><b>Principais jogos</b></p>
            <div style="padding-left: 15px">
               <ul>
                  <li>${games[0].name}</li>
                  <li>${games[1].name}</li>
                  <li>${games[2].name}</li>
               </ul>
            </div>
         </div>
         <br />
      </div>
   </div>
     `
   });

   developersElement.insertAdjacentHTML("beforeend", container);

}

async function renderHighlights(highlights, index){
   const highlightsElement = document.getElementById("content-highlights");
   let container = "";

   const hightlight = await getGameById(highlights[index].id);

      container += `
      <div class="highlight-image">
         <img src=${hightlight.background_image}
            style="height: 100%; max-width:80%; border-radius: 10px"></img>
      </div>
      <div class="highlight-text">
         <h1>${hightlight.name}</h1>
         <br />
         <p>
         ${hightlight.description}
         </p>
         <br />

         <div style="display: flex; justify-content: space-between;">
            <p><b>Metacritic: </b> ${hightlight.metacritic} </p>
            <p><b>Lan??amento: </b> ${hightlight.released} </p>
         </div>

         <p><b>Publisher: </b> ${hightlight.publishers[0].name} </p>

         <br />
      </div>
      `


   highlightsElement.insertAdjacentHTML("beforeend", container);
}

window.onload = async () => {
   const games = await getGames(DEFAULT_GAME_PAGE,DEFAULT_GAMES_PER_PAGE);
   const platforms = await getPlatforms(DEFAULT_PLATFORM_PAGE,DEFAULT_PLATFORMS_PER_PAGE);
   const developers = await getDevelopers(DEFAULT_PUBLISHER_PAGE,DEFAULT_PUBLISHERS_PER_PAGE);

   renderGames(games);
   renderPlatforms(platforms);
   renderDevelopers(developers);
   renderHighlights(games, 0);
};