let searchButton = document.querySelector("#search")

//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", ()=>{
  console.log("button pressed")
  sendApiRequest()
})


//An asynchronous function to fetch data from the API.
async function sendApiRequest(){
  let API_Key = "dj6HizzfnbOetQQ3veK63kEeXS0XrswnaZU0JCef";
  //let App_ID = "94e42a7a";
  //let API_Key = "53f4a32fbf5cdc5eb2b41937c67854d6";
  let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_Key}`);
  //let response = await fetch(`https://api.edamam.com/search?app_id=${App_ID}&app_key=${API_Key}&q=pizza`);
  console.log(response)
  let data = await response.json();
  console.log(data);
  useApiData(data);
}


//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data
function useApiData(data){
   document.querySelector("#content").innerHTML += data.explanation;
   
  // <class="card border-success mb-3" style="max-width: 18rem;">
  // <img src="${data.hits[0].recipe.image}" class="card-img-top" alt="...">
  //  <div class="card-header bg-transparent border-success">Header</div>
  //  <div class="card-body text-success">
  //    <h5 class="card-title">${data.hits[0].recipe.label}</h5>
  //    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  //  </div>
  //  <div class="card-footer bg-transparent border-success">Footer</div>`;
   document.querySelector("#content").innerHTML += `<img src="${data.url}" alt="${data.title}" />`;
   document.querySelector("#content").innerHTML += `<p>${data.title}</p>`;
}
