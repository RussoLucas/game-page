let DEFAULT_GAME_PAGE = 1;
const DEFAULT_GAMES_PER_PAGE = 20;

async function searchGame(search, page, pageSize){
   try {
      const response =  await fetch(`https://api.rawg.io/api/games?key=c0c2fae56ef54db2a862754390fd3b60&search=${search}&page=${page}&page_size=${pageSize}`);
      
      const results = await response.json();

      if(!response.ok) throw new Error("Not a 2xx response");

      return results.results;
   } catch (error) {
      console.error(error);
   }
}

function renderGames(games){
   const releases = document.getElementById("content-releases");
   let container = "";

   games.map(({name,  background_image, id, metacritic})=> {
      container += `
      <div class="card-results">
         <p>${name}</p>
         <img src=${background_image || "../assets/images/default-image.png"}
            style="width: 320px; height: 200px; border-radius: 15px;"></img>
         <a href="details.html?id=${id}">Details...</a>
      </div>`
   });

   releases.insertAdjacentHTML("beforeend", container);
}

async function loadMoreGames(){
   const urlParams = new URLSearchParams(window.location.search);
   const param = urlParams.get("search");
   DEFAULT_GAME_PAGE++;

   const games = await searchGame(param, DEFAULT_GAME_PAGE, DEFAULT_GAMES_PER_PAGE);
   renderGames(games);  
}

window.onload = async () => {
   const urlParams = new URLSearchParams(window.location.search);
   const param = urlParams.get("search");

   const games = await searchGame(param, DEFAULT_GAME_PAGE, DEFAULT_GAMES_PER_PAGE);
   
   renderGames(games);  
}