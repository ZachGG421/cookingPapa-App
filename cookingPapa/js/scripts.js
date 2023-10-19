const ingredientInput = document.getElementById('ingredientInput');
const addIngredientButton = document.getElementById('addIngredientButton');
const ingredientList = document.getElementById('ingredientList');

addIngredientButton.addEventListener('click', () => {
    const ingredient = ingredientInput.Value.trim();

    if(ingredient) {
        const listItem = document.createElement('li');

        listItem.textContent = ingredient;
        ingredientList.appendChild(listItem);

        ingredientInput.value = '';
    }

});

