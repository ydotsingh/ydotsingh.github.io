const movieNameRef = document.getElementById("movie-name");
const searchButton = document.getElementById("search-button");
const result = document.getElementById("result");

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    
    //if empty
    if(movieName.trim().length <=0){
        movieNameRef.classList.add('error'); 
    setTimeout(() => movieNameRef.classList.remove('error'), 500); 
    return;
    }
    
    else{
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            if(data.Response == 'True'){
                result.innerHTML=`
                <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="star-icon.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
                <h3>Director:</h3>
                <p>${data.Director}</p>
            `;
            }
            else{
                result.innerHTML=`<h3 class="msg">${data.Error}</h3>`;
            }
        }); 
            // .catch(() => {
            //     result.innerHTML=`<h3 class="msg">Error>/h3>`;
            // });
    }
};
searchButton.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);