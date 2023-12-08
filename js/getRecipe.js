import {fetchChosenRecipe} from './api.js'

// Extract the recipe ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// Make an API call or perform actions with the recipe ID
console.log('Recipe ID:', recipeId);

fetchChosenRecipe(recipeId)
    .then(data => {
        console.log('Recipe details: ', data);
        displayRecipeDetails(data);
    })
    .catch(error => {
        console.error('Error fetching recipe details:', error);
        
    });

    //start of spriint 3
    
    function displayRecipeDetails(recipe) {
        // Get the container element where you want to display the details
        const recipeContainer = document.getElementById('recipeContainer');
        
        
        // Display title
        const title = document.createElement('h1');
        title.textContent = recipe.title;
        recipeContainer.appendChild(title);
        

        // Display image
        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.title;
        recipeContainer.appendChild(image);
    
        // Display extendedIngredients
        const ingredientsTitle = document.createElement('h2');
        ingredientsTitle.textContent = 'Ingredients:';
        recipeContainer.appendChild(ingredientsTitle);
    
        const ingredientsList = document.createElement('ul');
        recipe.extendedIngredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
            ingredientsList.appendChild(listItem);
        });
        recipeContainer.appendChild(ingredientsList);
    
        // Display instructions
        const instructionsTitle = document.createElement('h2');
        instructionsTitle.textContent = 'Instructions:';
        recipeContainer.appendChild(instructionsTitle);

        const instructionsList = document.createElement('ol');
        recipe.analyzedInstructions.forEach(instruction => {
            instruction.steps.forEach((step, index) => {
                const instructionItem = document.createElement('li');
                instructionItem.innerHTML = `${step.step}`;
                instructionsList.appendChild(instructionItem);
            });
        });
        recipeContainer.appendChild(instructionsList);
        
    }    

