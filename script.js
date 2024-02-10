function searchRecipes() {
  const ingredientInput = document.getElementById("ingredientInput");
  const ingredient = ingredientInput.value.trim();

  if (ingredient === "") {
    alert("Please enter an ingredient.");
    return;
  }

  document.getElementById("recipeResults").innerHTML = "";

  fetch(
    `https://api.edamam.com/search?q=${ingredient}&app_id=c9b598f0&app_key=590bdcc2bbcb721af2744855daa648dd	`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.hits.length === 0) {
        document.getElementById("recipeResults").innerHTML =
          "<p>No recipes found.</p>";
        return;
      }

      const recipes = data.hits
        .map((hit) => {
          const recipe = hit.recipe;
          return `
          <div class="recipe">
            <h2>${recipe.label}</h2>
            <img src="${recipe.image}" alt="${recipe.label}">
            <p><strong>Ingredients:</strong> ${recipe.ingredientLines.join(
              ", "
            )}</p>
            <p><strong>Link:</strong> <a href="${recipe.url}" target="_blank">${
            recipe.source
          }</a></p>
          </div>
        `;
        })
        .join("");

      document.getElementById("recipeResults").innerHTML = recipes;
    })
    .catch((error) => console.error("Error fetching recipes:", error));
}
