const apiKey = "bfe6078194544716a3a05ca2ca45eb48";

// Function to fetch recipes based on ingredients
export async function fetchRecipes(ingredients) {
    const domain = "https://api.spoonacular.com/recipes/findByIngredients";
  
    const queryParams = {
      apiKey: apiKey,
      number: 10,
      ingredients: ingredients,
    };

    const queryString = Object.keys(queryParams)
    .map(key => key + '=' + encodeURIComponent(queryParams[key]))
    .join('&');

  const apiURL = `${domain}?${queryString}`;
  console.log(apiURL);

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


//fetch function for recipePage.html
export async function fetchChosenRecipe(id) {
  const domain = `https://api.spoonacular.com/recipes/${id}/information`;

  const queryParams = {
    apiKey: apiKey,
  };

  const queryString = Object.keys(queryParams)
    .map(key => key + '=' + encodeURIComponent(queryParams[key]))
    .join('&');

  const apiURL = `${domain}?${queryString}`;
  console.log(apiURL);

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


