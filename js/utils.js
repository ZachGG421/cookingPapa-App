
//Adds ingredient input to list of ingredients
export function addIngredient(ingredient, ingredientList, ingredientsArr) {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient;
    ingredientList.appendChild(listItem);
    ingredientInput.value = "";
    ingredientsArr.push(ingredient);
}

//removes ingredient input to list of ingredients
export function removeIngredient(ingredientsArr, ingredientList) {
    if (ingredientsArr.length > 0) {
        const removedIngredient = ingredientsArr.pop();
        const listItems = ingredientList.getElementsByTagName('li');
        if (listItems.length > 0) {
            ingredientList.removeChild(listItems[listItems.length - 1]);
        }
    } else if (ingredientsArr.length === 0) {
        alert('Ingredient list is empty');
    }
}

//ingredients Array
export const ingredientsArr = [];


//creates list of ingredients based on user input
export function createIngredientsList(ingredients, title) {
    const listContainer = document.createElement('div');
    const listTitle = document.createElement('h3');
    listTitle.textContent = title;
    listContainer.appendChild(listTitle);

    const ul = document.createElement('ul');
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
        
        ul.appendChild(li);
    });

    listContainer.appendChild(ul);
    return listContainer;
}


export function redirectToRecipePage(recipeId) {
    window.location.href = `/cookingPapa-App/public/recipePage.html?id=${recipeId}`;
}


