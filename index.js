const search = document.getElementById("search");
search.addEventListener("click",itemList);
const item = document.getElementById("item-data");
item.addEventListener("click",mealRecipe);
const details = document.getElementById("details");

// meal list
function itemList(input){
    const insert = document.getElementById("input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${insert}`)
        .then(res => res.json())
        .then(data => {
            let tag = "";
            if(data.meals){
                data.meals.forEach(foodItems => {
                    tag +=`
                        <div class="food-item" data-id=${foodItems.idMeal}>
                            <img src="${foodItems.strMealThumb}">
                            <div class="food-title">
                                <h2>${foodItems.strMeal}</h2>
                            </div>
                        </div>
                    `;
                });
                item.classList.remove("nothingFound");
                details.classList.remove("show");
            }
            else{
                tag = "Nothing Found here"
                item.classList.add("nothingFound")
            }
            item.innerHTML = tag;
        })
}

function mealRecipe(a){
    item.style.display = "none";
    details.style.display = "block";
    const add = a.target.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${add.dataset.id}`)
        .then(res => res.json())
        .then(data => mealIngredient(data.meals))
}

function mealIngredient(meals){
    let tag = `
        <div class="meals-details-heading">
            <h2>Category : ${meals[0].strCategory}</h2>
        </div>
        <div class="each-meal">
            <div class="food-image">
            <img src="${meals[0].strMealThumb}">
            </div>
            <div class="foods-title-details">
            <h3>${meals[0].strMeal}</h3>
            </div>
        </div>
        <div class="ingredient">
            <h3>Recipes</h3>
            <p class="details">${meals[0].strInstructions}</p>
        </div>
    `
    details.innerHTML = tag;
    details.classList.add("Show");
}