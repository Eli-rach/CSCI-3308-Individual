document.getElementById('submitButton').addEventListener('click', searchAPI);

var endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function searchAPI(){
    let input = document.getElementById('Cocktail').value; 
    let url = endPoint + input;
    console.log(url)
    $.ajax({ url: url, dataType: "json", cors: true, method: "GET"}).then((data) => {
        console.log(data); //Review all of the data returned
        document.getElementById('cardHeader').innerHTML = '<img src="'+data.drinks[0].strDrinkThumb+'" class="card__image" id ="cardImage" width="600">' //data.drinks[0].strDrinkThumb;
        document.getElementById('cardTitle').innerHTML = data.drinks[0].strDrink;
        let catergory = "Catergory: " +data.drinks[0].strCategory;
        console.log(catergory)
        document.getElementById('cardText1').innerHTML = catergory;
        document.getElementById('cardText2').innerHTML = data.drinks[0].strAlcoholic;
        document.getElementById('cardText3').innerHTML = data.drinks[0].strInstructions;
        // '<img src='+data.drinks[0].strDrinkThumb+'class="card__image" width="600">'
    });
}