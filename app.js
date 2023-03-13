const search = document.getElementById('mealInput');
const errorMessage = document.getElementById('errorMessage')
const searchBtn = document.getElementById('searchButton');
const mealContainer = document.getElementById('mealCard');
//------------- handle search button-----------
const searchFood = () => {
    document.getElementById("mealCard").style.display = "grid";
     document.getElementById("mealItemsInfo").style.display = "none"
    const searchField = document.getElementById('mealInput'); 
    
    const searchData = searchField.value  
    if (!searchData) {
        // alert('Item can not be empty')
       
        errorMessage.innerHTML='please write something'
       
    } else{
        errorMessage.innerHTML ="";
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`;
    fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(data => displayMealInfo(data.meals))
    .catch((error) => {
        errorMessage.innerHTML="Your Search Result didn't match !!!";
        // errorMessage.innerHTML ="";
      }); 
    }  
    searchField.value="";
}

const displayMealInfo = mealData => {
    const mealContainer = document.getElementById('mealCard');
    document.getElementById('mealCard').innerText="";
    // console.log(mealData)
    mealData.forEach(item => {
        const foodItemName = document.createElement('div');
        foodItemName.className = 'meal-items';
        itemPosition = item.idMeal;
        const mealInformation = `
        <img src ="${item.strMealThumb}">
        <h3>${item.strMeal}</h3>
        `
        foodItemName.innerHTML = mealInformation;
        foodItemName.addEventListener('click', function () {
            mealIngredientsInfo(item.idMeal);
        });
        mealContainer.appendChild(foodItemName);
    });
    
}


//API Call by fetch for meal ingredients 

const mealIngredientsInfo = mealItemName => { 
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItemName}`;
          fetch(url)
        .then(res => res.json())
         .then(data => displayDetails(data.meals))
        //   .then(data => console.log(data.meals))
}

//meal ingredients details information

const displayDetails = mealItemDetails => {
    const meal=mealItemDetails[0]
     console.log(mealItemDetails[0])
    const mealItemsInformation = document.getElementById('mealItemsInfo');
    document.getElementById('mealItemsInfo').innerHTML="";
    mealItemDetails.forEach(items => {
        const mealItemsInformations = document.createElement('div');
        mealItemsInformations.className = 'ingredients-info';
        console.log(items)
        console.log(items.strMeal);
        const itemsName = document.createElement('h1');
        const ingredients = document.createElement('h5');
        ingredients.innerText = 'Ingredients';
        itemsName.innerText = items.strMeal;
        const ul = document.createElement('ul');
        const imgUrl = document.createElement('img');
        imgUrl.src = items.strMealThumb;
        mealItemsInformations.appendChild(imgUrl);
        // Dynamic way to add li in ul
        for (let i=1; meal[`strIngredient${i}`]; i++){
            const li=`
            <li>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>

            `
            ul.innerHTML+=li 
        }
    // the below code shows the output all keys within the object   
    //   Object.keys(mealItemDetails).forEach((key) => {
       
    //     ul.innerHTML += `
    //     <li>${key}</li>
    //     `;
    //   });
    //another way to add li in ul  
        // const li = `
        
        //  <p>${items.strIngredient1}</p>
        //  <p>${items.strIngredient2}</p>
        //  <p>${items.strIngredient3}</p>
        //  <p>${items.strIngredient4}</p>
        //  <p>${items.strIngredient5}</p>
        //  <p>${items.strIngredient6}</p>
        //  <p>${items.strIngredient7}</p>
        //  <p>${items.strIngredient8}</p>
        //  <p>${items.strIngredient9}</p>
        //  <p>${items.strIngredient10}</p>
        //  <p>${items.strIngredient11}</p>
        //  <p>${items.strIngredient12}</p>
        //  <p>${items.strIngredient13}</p>
        // `
       
        // ul.innerHTML=li 
        
        mealItemsInformations.appendChild(itemsName);
        mealItemsInformations.appendChild(ingredients);
        mealItemsInformations.appendChild(ul);
        mealItemsInformation.appendChild(mealItemsInformations);
        
    });
  
    // document.getElementById("mealCard").style.display = "none";
    document.getElementById("mealItemsInfo").style.display = "block"
}
