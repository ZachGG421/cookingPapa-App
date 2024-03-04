//getting util functions from utils.js
import {addIngredient, removeIngredient, ingredientsArr, createIngredientsList, redirectToRecipePage} from './utils.js';
import {fetchRecipes} from './api.js'

//DOM elements
const ingredientInput = document.getElementById('ingredientInput');
const addIngredientButton = document.getElementById('addIngredientButton');
const ingredientList = document.getElementById('ingredientList');
const searchButton = document.getElementById('search');
const remIngredientButton = document.getElementById('remIngredientButton');
//const resultsContainer = document.querySelector('resultsContainer');
let resultsContainer;

//Event listener for adding ingredients
addIngredientButton.addEventListener('click', (event) => {
    event.preventDefault();
    const ingredient = ingredientInput.value.trim();

    //Add ingredient to the list 
    addIngredient(ingredient, ingredientList, ingredientsArr);

});

remIngredientButton.addEventListener('click', () => {
    removeIngredient(ingredientsArr, ingredientList);

});

searchButton.addEventListener('click', () => {

    //if results container has recipes, clear
    if(resultsContainer) {
        resultsContainer.innerHTML = '';
    
    } else {
        resultsContainer = document.createElement('div');
        resultsContainer.classList.add('results-container');
        document.getElementById('wrapper').appendChild(resultsContainer);
    }

    //api call to fetch, passing list of ingredients as parameter
    fetchRecipes(ingredientsArr)
        .then(data => {
            
            console.log(data);
            
            //Loop for each recipe
            data.forEach(recipe => {

                //creates div element with class 'recipe-container'
                const recipeContainer = document.createElement('div');
                recipeContainer.classList.add('recipe-container');

                //declares title of each recipe to h2 element
                const title = document.createElement('h2');
                title.textContent = recipe.title;

                //declares image of recipe to img element
                const image = document.createElement('img');
                image.src = recipe.image;
                image.alt = recipe.title;

                console.log(recipe.id);

                //adds title and image variables to recipeContainer
                recipeContainer.appendChild(title);
                recipeContainer.appendChild(image);

                //compares the ingredients list to the ingredients used in selected recipe and outputs them
                if (recipe.usedIngredients) {
                    const usedIngredientsList = createIngredientsList(recipe.usedIngredients, 'Used Ingredients:');
                    recipeContainer.appendChild(usedIngredientsList);
                }

                //compares the ingredients list to the ingredients not used and outputs them
                if (recipe.unusedIngredients) {
                    const unusedIngredientsList = createIngredientsList(recipe.unusedIngredients, 'Unused Ingredients:');
                    recipeContainer.appendChild(unusedIngredientsList);
                }

                //creates 'recipe button' to redirect to page with full recipe
                const recipeButton = document.createElement('button');
                recipeButton.textContent = "recipe";
                recipeButton.addEventListener('click', () => redirectToRecipePage(recipe.id));
                recipeContainer.appendChild(recipeButton);

                resultsContainer.appendChild(recipeContainer);
                
            });
        });
});

