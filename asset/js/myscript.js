let pickaDate = document.querySelector("#pickadate");
let inputDate = pickaDate.value
let xmlhttp = new XMLHttpRequest();



flatpickr(pickaDate, {
  
  dateFormat: "Y-m-d",
  maxDate: "today",
});


let datePicker = pickaDate.addEventListener("change", function() {
let API_Key = "dj6HizzfnbOetQQ3veK63kEeXS0XrswnaZU0JCef";
let apiLink = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}`;
let dateLink = `&date=${pickaDate.value}&`

//let dateLink = "&date=" +pickaDate.value+ "&";
let queryByDate = `${apiLink}${dateLink}`
console.log(queryByDate);
console.log(pickaDate.value);
console.log(inputDate);


xmlhttp.onreadystatechange = function() {
  if(this.readyState==4 && this.status==200){
    let data = JSON.parse(this.responseText);

    let copyright = data["copyright"];
    let date = data["date"];
    let explanation = data["explanation"];
    let image = data["url"];
    let title = data["title"];
    let media_type = data["media_type"];
    let hdurl = data["hdurl"];
    console.log(data);
    let imageType =`<a id="wrapper-hdurl" href="" target="_blank">
    <img id="wrapper-image" class="card-img-top" src="" alt="Card image cap"></a>`;

    let videoType =`<div class="ratio ratio-21x9">
    <iframe id="wrapper-video" src="" width="800" height="500" allowfullscreen></iframe></div>`;
    // console.log(copyright);
    // console.log(date);
    // console.log(explanation);
    // console.log(image);
    // console.log(title);
    // console.log(media_type);
    // console.log(hdurl);

    //document.getElementById("wrapper-url").src = image;
    document.getElementById("wrapper-title").innerHTML = `Title: ${title}`;
    document.getElementById("wrapper-explanation").innerHTML=explanation;
    document.getElementById("wrapper-copyright").innerHTML=copyright;
    //document.getElementById("wrapper-hdurl").href=hdurl;
    document.getElementById("wrapper-date").innerHTML=`Date: ${date}`;

    if(media_type==="image"){
       document.getElementById("wrapper-media").innerHTML = imageType;
       document.getElementById("wrapper-image").src=image;
       document.getElementById("wrapper-hdurl").href=hdurl;

    }else{
      document.getElementById("wrapper-media").innerHTML= videoType;
      document.getElementById("wrapper-video").src=image
    }

  }

};

xmlhttp.open("GET", queryByDate, true);
xmlhttp.send();

})

datePicker;