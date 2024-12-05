// app.js

// DOM Elements
const recipeForm = document.getElementById('recipe-form');
const recipeNameInput = document.getElementById('recipe-name');
const ingredientsInput = document.getElementById('ingredients');
const instructionsInput = document.getElementById('instructions');
const categoryInput = document.getElementById('category');
const recipeList = document.getElementById('recipe-list');
const searchInput = document.getElementById('search-input');

// Load recipes from local storage
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Display recipes
function displayRecipes(recipesToDisplay) {
    recipeList.innerHTML = '';
    recipesToDisplay.forEach((recipe, index) => {
        const recipeItem = document.createElement('li');
        recipeItem.innerHTML = `
            <div>
                <strong>${recipe.name}</strong><br>
                <em>${recipe.category}</em>
            </div>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(recipeItem);
    });
}

// Add recipe
function addRecipe(event) {
    event.preventDefault();
    const newRecipe = {
        name: recipeNameInput.value,
        ingredients: ingredientsInput.value,
        instructions: instructionsInput.value,
        category: categoryInput.value,
    };
    
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes(recipes);

    recipeForm.reset(); // Clear form
}

// Delete recipe
function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes(recipes);
}

// Search and filter recipes
function searchRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchTerm) || recipe.category.toLowerCase().includes(searchTerm);
    });
    displayRecipes(filteredRecipes);
}

// Event listeners
recipeForm.addEventListener('submit', addRecipe);
searchInput.addEventListener('input', searchRecipes);

// Initial display of recipes
displayRecipes(recipes);
