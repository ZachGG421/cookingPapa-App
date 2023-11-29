//getting util functions from utils.js
import {addIngredient, removeIngredient, ingredientsArr } from './utils.js';
import {fetchRecipes} from './api.js'

//DOM elements
const ingredientInput = document.getElementById('ingredientInput');
const addIngredientButton = document.getElementById('addIngredientButton');
const ingredientList = document.getElementById('ingredientList');
const searchButton = document.getElementById('search');
const remIngredientButton = document.getElementById('remIngredientButton');
//const resultsContainer = document.querySelector('resultsContainer');

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
    
    const resultsContainer = document.createElement('div');
    
    resultsContainer.classList.add('results-container');
    resultsContainer.innerHTML = '';
    document.body.appendChild(resultsContainer);

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
                recipeContainer.appendChild(image);

                recipeContainer.appendChild(title);
                resultsContainer.appendChild(recipeContainer);
            });
        });
});

