//getting util functions from utils.js
import {addIngredient, removeIngredient, ingredientsArr, createIngredientsList} from './utils.js';
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

    if(resultsContainer) {
        resultsContainer.innerHTML = '';
    } else {
        resultsContainer = document.createElement('div');
        resultsContainer.classList.add('results-container');
        document.body.appendChild(resultsContainer);
    }
    fetchRecipes(ingredientsArr)
        .then(data => {
            
            console.log(data);
            
            data.forEach(recipe => {

                const recipeContainer = document.createElement('div');
                recipeContainer.classList.add('recipe-container');

                const title = document.createElement('h2');
                title.textContent = recipe.title;

                const image = document.createElement('img');
                image.src = recipe.image;
                image.alt = recipe.title;

                recipeContainer.appendChild(title);
                recipeContainer.appendChild(image);

                if (recipe.usedIngredients) {
                    const usedIngredientsList = createIngredientsList(recipe.usedIngredients, 'Used Ingredients:');
                    
                    recipeContainer.appendChild(usedIngredientsList);
                }

                if (recipe.unusedIngredients) {
                    const unusedIngredientsList = createIngredientsList(recipe.unusedIngredients, 'Unused Ingredients:');
                    console.log(unusedIngredientsList)
                    recipeContainer.appendChild(unusedIngredientsList);
                }
                resultsContainer.appendChild(recipeContainer);
            });
        });
});

