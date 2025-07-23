const resultDiv = document.getElementById('result');
const searchButton = document.getElementById('search');
const mealInput = document.getElementById('meal');

function search(meal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(response => response.json())
    .then(data => {
      resultDiv.innerHTML = '';

      if (data.meals) {
        data.meals.forEach(mealItem => {
          const mealCard = document.createElement('div');
          mealCard.className = 'meal-card';
          mealCard.innerHTML = `
            <img src="${mealItem.strMealThumb}" alt="${mealItem.strMeal}" />
            <h3>${mealItem.strMeal}</h3>
          `;
          resultDiv.appendChild(mealCard);
        });
      } else {
        resultDiv.innerHTML = '<p>No meals found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching meal data:', error);
      resultDiv.innerHTML = '<p>Something went wrong. Please try again.</p>';
    });
}

searchButton.addEventListener('click', () => {
  const meal = mealInput.value.trim();
  if (meal) {
    search(meal);
  }
});
