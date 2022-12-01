async function getGameDetails(id){
   try {
      const response =  await fetch(`https://api.rawg.io/api/games/${id}?key=c0c2fae56ef54db2a862754390fd3b60`);
      
      const results = await response.json();

      if(!response.ok) throw new Error("Not a 2xx response");

      return results;
   } catch (error) {
      console.error(error);
   }
}

function renderGameDetails(details){
   const highlightsElement = document.getElementById("content-highlights");
   let container = "";

   const publishers = details.publishers.length ? details.publishers[0].name: 'No publisher declared'
   
   container += `
      <div class="highlight-image">
         <img src=${details.background_image|| "../assets/images/default-image.png"}
            style="height: 100%; max-width:80%; border-radius: 10px"></img>
      </div>
      <div class="highlight-text">
         <h1>${details.name}</h1>
         <br />
         <p>
         ${details.description}
         </p>
         <br />

         <div style="display: flex; justify-content: space-between;">
            <p><b>Metacritic: </b> ${details.metacritic} </p>
            <p><b>Lançamento: </b> ${details.released} </p>
         </div>

         <p><b>Publisher: </b> ${ publishers} </p>

         <br />

      </div>
      `


   highlightsElement.insertAdjacentHTML("beforeend", container);
}

window.onload = async () => {
   const urlParams = new URLSearchParams(window.location.search);
   const param = urlParams.get("id");

   const gameDetails = await getGameDetails(param)

   renderGameDetails(gameDetails);
}