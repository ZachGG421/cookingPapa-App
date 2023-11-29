import {fetchChosenRecipe} from './api.js'

// Extract the recipe ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// Make an API call or perform actions with the recipe ID
console.log('Recipe ID:', recipeId);

fetchChosenRecipe(recipeId)
    .then(data => {
        console.log('Recipe details: ', data)
    })
    .catch(error => {
        console.error('Error fetching recipe details:', error);
    });

