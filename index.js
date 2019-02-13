'use strict';

const apiKey = '3d3fcf34cda34fce587f2359960fe43f';
const meal = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const restaurant = 'https://developers.zomato.com/api/v2.1/search?apikey=3d3fcf34cda34fce587f2359960fe43f&entity_id=';
const locURL = 'https://developers.zomato.com/api/v2.1/locations?apikey=3d3fcf34cda34fce587f2359960fe43f&query=';

$('.restart').on('click', function(){
  $('.intro-pic').show();
  $('.instructions').show();
  watchForm();  
});

$('.get-started').on('click', function(){
  $('.instructions').hide();
  $('.container').show();
  $('.js-form').show();
  watchForm(); 
});
function watchForm() {
  
  /*$('.container').show();
  $('.intro-pic').show();*/
  $('.buttonval').on('click', function(event) {
    event.preventDefault(); 
   $('.container').hide();
   $('.intro-pic').hide(); 

   const locGet = $('#js-search-term').val();
   const cuisine = $('#js-cuisine-type').val();
   getInfo(cuisine);
   getInfo2(locGet, cuisine);
 
   
  });
  $('.restart').on('click', function(){
    $('.intro-pic').show();
    $('.instructions').show();
    $('.container').hide();
    $('.js-form').hide(); 
 });
}
$(watchForm);

function getInfo(cuisine) {
 const url1 = meal + cuisine;
 console.log(url1);
 fetch(url1)
   .then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => displayResults(responseJson))
   .catch(err => {
     $('#js-error-message').text(`Something went wrong: ${err.message}`);
   });
};

function getInfo2(loc, cuisine) {
 const url12 = locURL + loc + '%20'; 
 console.log(url12);

 fetch(url12)
  .then(response => {
   if (response.ok) {
    return response.json();
   }
   throw new Error(response.statusText);
   })
  .then(responseJson => {
   let idVal = responseJson.location_suggestions[0].entity_id;
   let urlNew = restaurant + idVal + '&entity_type=city&q=' + cuisine ; 
   console.log(urlNew);
   fetch(urlNew)
    .then(response => {
     if (response.ok) {
      return response.json();
     }
     throw new Error(response.statusText); 
    })
  .then(responseJson => displayResults2(responseJson))
  .catch(err => {
   $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
 });
};


function displayResults(responseJson) {
 console.log(responseJson);
 var arr = responseJson;
 console.log(arr);
 let lenTotal = arr.meals.length;
 for (let i = 0; i < lenTotal; i++){
  $('#results-list-1').append(
   `<li><h3>${arr.meals[i].strMeal}</h3>
   <p> <a href="https://www.themealdb.com/meal.php?c=${arr.meals[i].idMeal}">Recipe</p>
   </li>`
  );
 };
 $('#results').removeClass('hidden');
 
 $('.restart').on('click', function(){
    $('#results').addClass('hidden');
    $('#results-list-1').empty(); 
    $('#results-list-2').empty(); 
    $('#js-search-term').reset(); 
    $('#js-cuisine-type').reset(); 
  }); 
};


function displayResults2(responseJson2) {
 console.log(responseJson2);
 var arr = responseJson2;
 let lenTotal2 = arr.restaurants.length;
 console.log(lenTotal2);
 for (let i = 0; i < lenTotal2; i++){
  $('#results-list-2').append(
   `<li><h3>${arr.restaurants[i].restaurant.name}</h3>
   <p> ${arr.restaurants[i].restaurant.location.address}</p>
   <p> <a href="${arr.restaurants[i].restaurant.menu_url}">Menu</p>
   </li>`
  );
 };
 $('#results').removeClass('hidden');

 $('.restart').on('click', function(){
  $('#results').addClass('hidden'); 
  $('#results-list-1').empty(); 
  $('#results-list-2').empty();  
  $('#js-search-term').reset(); 
  $('#js-cuisine-type').reset(); 

 }); 
};



