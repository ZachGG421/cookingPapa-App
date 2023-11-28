//get input from html
const ingredientInput = document.getElementById('ingredientInput');
const addIngredientButton = document.getElementById('addIngredientButton');
const ingredientList = document.getElementById('ingredientList');
const searchButton = document.getElementById('search');
const remIngredientButton = document.getElementById('remIngredientButton');

const ingredientsArr = [];


//when button is pressed:
addIngredientButton.addEventListener('click', (event) => {
    event.preventDefault();
    const ingredient = ingredientInput.value.trim();

    //when ingredient gets a value
    if(ingredient) {
        const listItem = document.createElement('li');

        //add ingredient to list
        listItem.textContent = ingredient;
        ingredientList.appendChild(listItem);

        //reset ingredient variable
        ingredientInput.value = '';

        ingredientsArr.push(ingredient);
    }
});

//search to api
searchButton.addEventListener('click', () => {

    //const domain = "https://api.spoonacular.com/recipes/complexSearch";
    //const domain = "https://api.spoonacular.com/recipes/6969/information";
    const domain = "https://api.spoonacular.com/recipes/findByIngredients";
    const apiKey = "bfe6078194544716a3a05ca2ca45eb48";

    //const ingredients = "bananas";

    const queryParams = {
        apiKey: apiKey,
        number: 10,
        ingredients: ingredientsArr
    };

    const queryString = Object.keys(queryParams)
        .map(key => key + '=' + encodeURIComponent(queryParams[key]))
        .join('&');

    const apiURL = `${domain}?${queryString}`;
    console.log(apiURL);   
    
    fetch(apiURL)
        .then(response => {
            if(!response.ok) {
                throw new Error('HTTP error! Status: ${response.status}');
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error))
});


remIngredientButton.addEventListener('click', () => {
    if (ingredientsArr.length > 0) {
        const removedIngredient = ingredientsArr.pop();

        const listItems = ingredientList.getElementsByTagName('li');
        if (listItems.length > 0) {
            ingredientList.removeChild(listItems[listItems.length - 1]);
        }
    }
    else if (ingredientsArr.length === 0) {
        alert('Ingredient list is empty');
    }
});
