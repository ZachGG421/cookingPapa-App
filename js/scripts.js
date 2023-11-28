//get input from html
const ingredientInput = document.getElementById('ingredientInput');
const addIngredientButton = document.getElementById('addIngredientButton');
const ingredientList = document.getElementById('ingredientList');
const searchButton = document.getElementById('search');
const remIngredientButton = document.getElementById('remIngredientButton');
const container = document.querySelector('.container');

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

    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results-container');

    document.body.appendChild(resultsContainer);

    //const domain = "https://api.spoonacular.com/recipes/complexSearch";
    //const domain = "https://api.spoonacular.com/recipes/6969/information";
    const domain = "https://api.spoonacular.com/recipes/findByIngredients";
    const apiKey = "bfe6078194544716a3a05ca2ca45eb48";

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
        .then(data => {
            resultsContainer.innerHTML = '';

            console.log(data);
            data.forEach(recipe => {
                //console.log(recipe.title);

                const recipeContainer = document.createElement('div')
                recipeContainer.classList.add('recipe-container');

                const title = document.createElement('h2');
                title.textContent = recipe.title;

                
                const image = document.createElement('img');
                image.src = recipe.image;
                image.alt = recipe.title;
                recipeContainer.appendChild(image);

                recipeContainer.appendChild(title);
                resultsContainer.appendChild(recipeContainer);

                /*
                const usedIngredientsList = document.createElement('ul');
                usedIngredientsList.innerHTML = '<h3>Used Ingredients:</h3>';
                recipe.usedIngredientsList.forEach(ingredients => {
                    const li = document.createElement('li');
                    li.textContent = `${ingredients.amount} ${ingredients.unit} ${ingredients.name}`;
                    usedIngredientsList.appendChild(li);
                });

                const unusedIngredientsList = document.createElement('ul');
                unusedIngredientsList.innerHTML = '<h3> Unused Ingredients:</h3>';
                recipe.unusedIngredients.forEach(ingredients => {
                    const li = document.createElement('li');
                    li.textContent = `${ingredients.amount} ${ingredients.unit} ${ingredients.name}`;
                    unusedIngredientsList.appendChild(li);
                });

                recipeContainer.appendChild(title);
                recipeContainer.appendChild(image);
                recipeContainer.appendChild(usedIngredientsList);
                recipeContainer.appendChild(unusedIngredientsList);

                container.appendChild(recipeContainer);
                */
            });
        })
        .catch(error => console.error("Error:", error));
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
