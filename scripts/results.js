async function searchGame(search){
   try {
      const response =  await fetch(`https://api.rawg.io/api/games?key=c0c2fae56ef54db2a862754390fd3b60&search=${search}`);
      
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
      <div>
         <img src=${background_image}
            style="width: 400px; height: 250px; border-radius: 15px;"></img>
            <p>${name}</p>
         <a href="details.html?id=${id}">Mais detalhes...</a>
      </div>`
   });

   releases.insertAdjacentHTML("beforeend", container);
}

window.onload = async () => {
   const urlParams = new URLSearchParams(window.location.search);
   const param = urlParams.get("search");

   const games = await searchGame(param);

   console.log(games);
   renderGames(games);  

   console.log(games);
}