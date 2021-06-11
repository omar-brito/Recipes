const searchBtn = document.getElementById('button');
const mealList =  document.getElementById('meal');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');



searchBtn.addEventListener('click', getRecipes);
mealList.addEventListener('click', mealRecipe);
closeBtn.addEventListener('click', () => modal.parentElement.classList.remove('show-modal'));


function getRecipes() {
    let searchInput = document.getElementById('search').value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`) 
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        let html = '';
        if(data.meals) {
            data.meals.forEach(meal => {
                html += `<div class="meal-item" data-id = "${meal.idMeal}">

                            <div class="meal-image">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>

                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipeBtn">Get Recipe</a>
                            </div>
                        </div>`;
         
            });
            mealList.classList.remove('not-found');
        } else {
            html = "Sorry we didn't find any meals."
            mealList.classList.add('not-found');
        }
        //console.log(data);
        mealList.innerHTML = html;

    })
    .catch(function(err) {
        console.log(err);
    });
}

function mealRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('recipeBtn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => recipesModal(data.meals));
    }
}


function recipesModal(getmeal) {
    //console.log(getmeal);
    getmeal = getmeal[0];
    let html = `
           
            
                <div class="modal-header">
                    <h3>${getmeal.strMeal}</h3>
                    <img src="${getmeal.strMealThumb}">
                </div>
                <div class="modal-instruction" id="instruction">
                    <h3>Instructions:</h3>
                    <p>${getmeal.strInstructions}</p>
                </div>
                
            `;

                modal.innerHTML = html;
                modal.parentElement.classList.add('show-modal');

}

