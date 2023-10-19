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

searchButton.addEventListener('click', () => {
    if (ingredientsArr.length === 0) {
        alert('Ingredient list is empty');
        return;
    }
    else {
        console.log(ingredientsArr);
    }
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
