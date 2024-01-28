/// <reference types="../@types/jquery" />

$(function(){
    $('.loader').fadeOut(1000, function(){
        $('.loading').slideUp(1000,function(){
            $('body').css('overflow','auto');
        });
    });
    
    // $("#sideContainer .links li").slideDown();
});

$("#sideContainer").hide();
// $("#sideContainer .links li").slideDown();
$("#toggleButton").on("click", function () {
  if ($("#sideContainer").css("display") == "none") {
    console.log();

    
    $("#toggleButton").removeClass("fa-bars");
    $("#toggleButton").addClass("fa-times");
    // $("#sideContainer .links li").slideUp(10000);
    

    $("#sideContainer .links li").slideDown(500);
    
  } else {
    // $('#sideContainer .links li').slideDown(300);
    // $("#sideContainer .links li").animate({height:'0px'},1000);
    $("#sideContainer .links li").slideUp(500);
    $("#toggleButton").addClass("fa-bars");
    $("#toggleButton").removeClass("fa-times");
    
  }

  $("#sideContainer").animate(
    { width: "toggle", paddingInline: "toggle" },
    500
  );
//   $("#sideContainer .links li").animate({height:'toggle'},300)
});

async function getForHome() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  if (response.status == 200) {
    let finalRespone = await response.json();
    console.log(finalRespone);
    // console.log(finalRespone.meals[0].strMealThumb);
    // console.log(finalRespone.meals[0].strMeal);
    let cols = "";
    for (let i = 0; i < 20; i++) {
      cols += `
        <div class="col-md-3">
        <div class="cardContainer">
        <img src="${finalRespone.meals[i].strMealThumb}"></img>
              <div class="cardObacity d-flex justify-content-center align-items-center">
                <h1>${finalRespone.meals[i].strMeal}</h1>
              </div>
            </div>
        </div>
        `;
    }
    $("#displayRow").html(cols);

    let clickedCard = $(".cardObacity ");
    // console.log(clickedCard);
    clickedCard.on("click", function (e) {
      console.log(e.target);
      displayRecipe($(e.target).text());
    });
  }
}
async function displayRecipe(name) {
  let finalName = name.trim();

  // console.log(name);
  console.log(finalName);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${finalName}`
  );
  if (response.status == 200) {
    let finalRespone = await response.json();
    // let meal =finalRespone;
    console.log("Starts here");
    console.log(finalRespone);
    // let ingredientsArray =[];

    // console.log(finalRespone.meals[0].strIngredient1);
    let ingredients = "";
    let tags = finalRespone.meals[0].strTags?.split(",");
    if (!tags) tags = [];
    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
      tagsStr += `
        <li >${tags[i]}</li>`;
    }
    for (let i = 1; i < finalRespone.meals.length; i++) {
      if (
        finalRespone.meals[0][`strIngredient${i}`].trim().length !== 0 ||
        finalRespone.meals[0][`strIngredient${i}`] === null
      ) {
        // ingredientsArray.push(finalRespone.meals[0][`strIngredient${i}`]);
        ingredients += `
                <li >${finalRespone.meals[0][`strIngredient${i}`]}</li>
                `;
      }else{
        // console.log('not workinggg');
        ingredients+='';
      }
    }

    let output = `
        <div class="col-md-4">
          <div class="imgContentContainer text-center">
            <div class="recipeImgContainer">
              <img src="${finalRespone.meals[0].strMealThumb}">
            </div>
            <div><h1>${finalRespone.meals[0].strMeal}</h1></div>
          </div>
        </div>
        <div class="col-md-8">
         <div class="recipecontentContainer">
          <div class="row">
            <h2>Instructions</h2>
            <p>${finalRespone.meals[0].strInstructions}</p>
              </div>
          <div class="row">
            <h2>Area : <span>${finalRespone.meals[0].strArea}</span></h2>
            <h2>Category : <span>${finalRespone.meals[0].strCategory}</span></h2>
          </div>
          <div class="row">
            <h2>Recipes</h2>
            <div class="">
              <ul>
                ${ingredients}
              </ul>
            </div>
          </div>
          <div class="row tagsContainer">
            <h1>Tags</h1>
            <div class="d-flex"><ul>${tagsStr}</ul></div>
            <div class="d-flex justify-content-center ">
              <a id="p2" href='${finalRespone.meals[0].strSource}'>Source</a>
              <a id="p3" href='${finalRespone.meals[0].strYoutube}'>Youtube</a>
            </div>
          </div>
         </div>
        </div>
        `;

    $("#displayRow").html(output);
  }
}



$('#searchLink').on('click',function(){

    $('#searchingContainer').removeClass('d-none');
    $('#contactContainer').addClass('d-none');
    $('#displayRow').html('');
    $('#sByName').val('');
    $('#sByLetter').val('');
    $("#sideContainer").animate(
        { width: "toggle", paddingInline: "toggle" },
        500
      );
      $("#toggleButton").addClass("fa-bars");
    $("#toggleButton").removeClass("fa-times");
    let searchInputs=`
    <div class="row searchContainer">
            <div class="col-md-6">
              <input type="text"  placeholder="Search By Name" id="sByName">
            </div>
            <div class="col-md-6">
              <input type="text"   placeholder="Search By First Letter" id="sByLetter">
            </div>
        </div>
    `;

});

$('#sByName').keypress(async function(){

    console.log('working');
    let response=await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${$('#sByName').val()}`); 
    if(response.status==200){
      let final = await response.json();
      console.log(final);
      let cols = "";
    for (let i = 0; i < final.meals.length; i++) {
        console.log(final.meals[i].strMeal);
      cols += `
        <div class="col-md-3">
        <div class="cardContainer">
        <img src="${final.meals[i].strMealThumb}"></img>
              <div class="cardObacity d-flex justify-content-center align-items-center">
                <p>${final.meals[i].strMeal}</p>
              </div>
            </div>
        </div>
        `;
    }

    $('#displayRow').html(cols);

    let clickedCard = $(".cardContainer ");
    // console.log(clickedCard);
    clickedCard.on("click", function (e) {
      console.log(e.target);
      $('#searchingContainer').addClass('d-none');
      displayRecipe($(e.target).text());
    });

    }
});



$('#sByLetter').keyup(async function(){

    console.log('working');
    let tesst=$('#sByLetter').val();
    console.log(tesst);
    let response=await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${$('#sByLetter').val()}`); 
    if(response.status==200){
      let final = await response.json();
      console.log(final);
      let cols = "";
    for (let i = 0; i < final.meals.length; i++) {
        console.log(final.meals[i].strMeal);
      cols += `
        <div class="col-md-3">
        <div class="cardContainer">
        <img src="${final.meals[i].strMealThumb}"></img>
              <div class="cardObacity d-flex justify-content-center align-items-center">
                <p>${final.meals[i].strMeal}</p>
              </div>
            </div>
        </div>
        `;
    }

    $('#displayRow').html(cols);

    let clickedCard = $(".cardContainer ");
    // console.log(clickedCard);
    clickedCard.on("click", function (e) {
      console.log(e.target);
      $('#searchingContainer').addClass('d-none');
      displayRecipe($(e.target).text());
    });

    }
});



getForHome();

$('#categoriesLink').on('click',async function(){

    let xx=`<div class="loadingx">
    <span class="loader"></span>
  </div>`;

  $("#displayRow").html(xx);
  $('.loader').fadeOut(1000, function(){
    $('.loadingx').slideUp(1000,function(){
        $('body').css('overflow','auto');
    });
});
    $('#searchingContainer').addClass('d-none');
    $('#contactContainer').addClass('d-none');
    
    $("#sideContainer").animate(
        { width: "toggle", paddingInline: "toggle" },
        500
      );
      $("#toggleButton").addClass("fa-bars");
    $("#toggleButton").removeClass("fa-times");
    let response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response.status == 200) {
        let finalRespone = await response.json();
        console.log(finalRespone);
        let editedP='';
        
        let cols = "";
        for (let i = 0; i < finalRespone.categories.length; i++) {
            // console.log(finalRespone.categories[i].strCategoryDescription.length);
            // console.log(finalRespone.categories[i].strCategoryDescription.indexOf("."));
            editedP=finalRespone.categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ");
            // console.log(editedP);
          cols += `
            <div class="col-md-3">
            <div class="cardContainer">
            <img src="${finalRespone.categories[i].strCategoryThumb}"></img>
                  <div class="cardObacity d-flex  flex-column">
                    <h1 id='catName'>${finalRespone.categories[i].strCategory}</h1>
                    <p>${editedP}</p>
                  </div>
                </div>
            </div>
            `;
        }
        $("#displayRow").html(cols);
    
        let clickedCard = $(".cardObacity ");
        // console.log(clickedCard);
        clickedCard.on("click", function (e) {
            let fName='';
            if($(e.target).children().length==0){

                // console.log($(e.target)[0].localName);
                // console.log("not the parent");
                // console.log($(e.target).siblings());

                if($(e.target)[0].localName=='p'){
                    // console.log($(e.target).siblings()[0].innerHTML);
                    fName=$(e.target).siblings()[0].innerHTML;
                    console.log(fName);
                }else{
                    // console.log($(e.target)[0].innerHTML)
                    fName=$(e.target)[0].innerHTML;
                    console.log(fName);
                }
            }
            else{
                // console.log("the parent");
                // console.log($(e.target).children()[0].innerHTML);
                fName=$(e.target).children()[0].innerHTML;
                console.log(fName);
            }
            filterByCategory(fName);
        });


      }
});

async function filterByCategory(mainIngredient) {
    let finalName = mainIngredient.trim();
    console.log("Enterd filter");
    console.log(finalName);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${finalName}`
    );
    if (response.status == 200) {
      let finalRespone = await response.json();
      console.log(finalRespone);
      // console.log(finalRespone.meals[0].strMealThumb);
      // console.log(finalRespone.meals[0].strMeal);
      let cols = "";
      for (let i = 0; i < finalRespone.meals.length; i++) {
        cols += `
          <div class="col-md-3">
          <div class="cardContainer">
          <img src="${finalRespone.meals[i].strMealThumb}"></img>
                <div class="cardObacity d-flex justify-content-center align-items-center">
                  <h1>${finalRespone.meals[i].strMeal}</h1>
                </div>
              </div>
          </div>
          `;
      }
      $("#displayRow").html(cols);
  
      let clickedCard = $(".cardObacity ");
      clickedCard.on("click", function (e) {
        console.log(e.target);
        displayRecipe($(e.target).text());
      });
    }
  }

  $('#areaLink').on('click',async function(){

    let xx=`<div class="loadingx">
    <span class="loader"></span>
  </div>`;

  $("#displayRow").html(xx);
  $('.loader').fadeOut(1000, function(){
    $('.loadingx').slideUp(1000,function(){
        $('body').css('overflow','auto');
    });
});
    $('#searchingContainer').addClass('d-none');
    $('#contactContainer').addClass('d-none');
    
    $("#sideContainer").animate(
        { width: "toggle", paddingInline: "toggle" },
        500
      );
      $("#toggleButton").addClass("fa-bars");
    $("#toggleButton").removeClass("fa-times");
   
    console.log('area working');

    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
      );
      if (response.status == 200) {
        let finalRespone = await response.json();
        console.log(finalRespone);
        let cols = "";
      for (let i = 0; i < finalRespone.meals.length; i++) {
        console.log(finalRespone.meals[i].strArea);
        cols += `
        <div class="col-md-3">
        <div class="countrycontainer text-center">
          <div class="countryImgContainer text-center">
            <img src="Images/market2.png">
          </div>
          <h1 class='countryName'>${finalRespone.meals[i].strArea}</h1>
        </div>
      </div>
          `;
      }
      $("#displayRow").html(cols);
      let clickedCard = $(".countrycontainer ");
      clickedCard.on("click", function (e) {
        console.log(e.target);
        console.log($(e.target)[0].siblings);
        // console.log($(e.target).text());
        let fName='';
            if($(e.target).children().length==0){

                // console.log($(e.target)[0].localName);
                // console.log("not the parent");
                // console.log($(e.target).siblings());

                if($(e.target)[0].localName=='img'){
                    console.log($(e.target).parent().siblings()[0]);
                    fName=$(e.target).parent().siblings()[0].innerHTML;
                    console.log(fName);
                }else{
                    // console.log($(e.target)[0].innerHTML)
                    fName=$(e.target)[0].innerHTML;
                    console.log(fName);
                }
            }
            else{
                // console.log("the parent");
                console.log($(e.target).children());
                fName=$(e.target).children()[1].innerHTML;
                console.log('here');
                console.log(fName);
            }
            filterByArea(fName);
        // displayRecipe($(e.target).text());
      });
    }

});

async function filterByArea(mainIngredient) {
    let finalName = mainIngredient.trim();
    console.log("Enterd filter by area");
    console.log(finalName);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${finalName}`
    );
    if (response.status == 200) {
      let finalRespone = await response.json();
      console.log(finalRespone);
      // console.log(finalRespone.meals[0].strMealThumb);
      // console.log(finalRespone.meals[0].strMeal);
      let cols = "";
      for (let i = 0; i < finalRespone.meals.length; i++) {
        cols += `
          <div class="col-md-3">
          <div class="cardContainer">
          <img src="${finalRespone.meals[i].strMealThumb}"></img>
                <div class="cardObacity d-flex justify-content-center align-items-center">
                  <h1>${finalRespone.meals[i].strMeal}</h1>
                </div>
              </div>
          </div>
          `;
      }
      $("#displayRow").html(cols);
  
      let clickedCard = $(".cardObacity ");
      clickedCard.on("click", function (e) {
        console.log(e.target);
        displayRecipe($(e.target).text());
      });
    }
  }

  $('#ingredientsLink').on('click',async function(){
    let xx=`<div class="loadingx">
    <span class="loader"></span>
  </div>`;

  $("#displayRow").html(xx);
  $('.loader').fadeOut(1000, function(){
    $('.loadingx').slideUp(1000,function(){
        $('body').css('overflow','auto');
    });
});

    $('#searchingContainer').addClass('d-none');
    $('#contactContainer').addClass('d-none');
    
    $("#sideContainer").animate(
        { width: "toggle", paddingInline: "toggle" },
        500
      );
      $("#toggleButton").addClass("fa-bars");
    $("#toggleButton").removeClass("fa-times");
   
    console.log('ingredients working');

    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
      );
      if (response.status == 200) {
        let finalRespone = await response.json();
        console.log(finalRespone);
        let editedP='';
        let cols = "";
      for (let i = 0; i < 20; i++) {
        editedP=finalRespone.meals[i].strDescription;
        // console.log(editedP.split(" ").slice(0,20).join(" "));
        // console.log(finalRespone.meals[i].strIngredient);
        cols += `
        <div class="col-md-3">
            <div class="ingredientscontainer text-center">
              <div class="ingredientsImgContainer text-center">
                <img src="Images/ingredients.png">
              </div>
              <h1 >${finalRespone.meals[i].strIngredient}</h1>
              <p>${editedP.split(" ").slice(0,20).join(" ")}</p>
            </div>
          </div>
          `;
      }
      $("#displayRow").html(cols);
      let clickedCard = $(".ingredientscontainer ");
      clickedCard.on("click", function (e) {
        // console.log(e.target);
        // console.log($(e.target)[0].siblings);
        // console.log($(e.target).text());
        let fName='';
            if($(e.target).children().length==0){

                // console.log($(e.target)[0].localName);
                // console.log("not the parent");
                // console.log($(e.target).siblings());

                if($(e.target)[0].localName=='img'){
                    console.log($(e.target).parent().siblings()[0]);
                    fName=$(e.target).parent().siblings()[0].innerHTML;
                    console.log(fName);
                }else if($(e.target)[0].localName=='p'){
                    console.log('p is hereeeeeeeeeeeeee');
                    console.log($(e.target).siblings()[1].innerHTML);

                }else{
                    // console.log($(e.target)[0].innerHTML)
                    fName=$(e.target)[0].innerHTML;
                    console.log(fName);
                }
            }
            else{
                // console.log("the parent");
                console.log($(e.target).children());
                fName=$(e.target).children()[1].innerHTML;
                console.log('here');
                console.log(fName);
            }
            filterByIngredient(fName);
            // filterByArea(fName);
        // displayRecipe($(e.target).text());
      });
    }

});

async function filterByIngredient(mainIngredient) {
    let finalName = mainIngredient.trim();
    console.log("Enterd filter by ingredient");
    console.log(finalName);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${finalName}`
    );
    if (response.status == 200) {
      let finalRespone = await response.json();
      console.log("finalRespone");
      console.log(finalRespone);
      // console.log(finalRespone.meals[0].strMealThumb);
      // console.log(finalRespone.meals[0].strMeal);
      let cols = "";
      for (let i = 0; i < finalRespone.meals.length; i++) {
        cols += `
          <div class="col-md-3">
          <div class="cardContainer">
          <img src="${finalRespone.meals[i].strMealThumb}"></img>
                <div class="cardObacity d-flex justify-content-center align-items-center">
                  <h1>${finalRespone.meals[i].strMeal}</h1>
                </div>
              </div>
          </div>
          `;
      }
      $("#displayRow").html(cols);
  
      let clickedCard = $(".cardObacity ");
      clickedCard.on("click", function (e) {
        console.log(e.target);
        displayRecipe($(e.target).text());
      });
    }
  }

  let valid=[false,false,false,false,false,false];
//   let after=[]

 $('#nameInput').keyup(function(e){
    let regex = /^[A-Z][a-z]{3,10}$/;
    console.log($(e.target).val());
    let name=$(e.target).val();
    if (regex.test(name)) {
        console.log("true");
        $('#nameWarning').addClass('d-none');
        valid[0]=true;
        let counter =0;
        for(let i =0 ; i<valid.length ;i++){
            if(valid[i]==true){
                counter++;
            }
        }
        if(counter===6){
            console.log('trueeeeeeeeeeeeeeeeeeee');
            $('#subBtn').removeAttr('disabled');
        }
        console.log(valid);
        return true;
      } else {
        valid[0]=false;
        console.log(valid);
        
        $('#subBtn').attr('disabled','true');
        $('#nameWarning').removeClass('d-none');
        console.log("false");
        return false;
      }
 });
 $('#emailInput').keyup(function(e){
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    console.log($(e.target).val());
    let name=$(e.target).val();
    if (regex.test(name)) {
        console.log("true");
        $('#emailWarning').addClass('d-none');
        valid[1]=true;
        let counter =0;
        for(let i =0 ; i<valid.length ;i++){
            if(valid[i]==true){
                counter++;
            }
        }
        if(counter===6){
            console.log('trueeeeeeeeeeeeeeeeeeee');
            $('#subBtn').removeAttr('disabled');
        }
        console.log(valid);
        return true;
      } else {
        valid[1]=false;
        console.log(valid);
        $('#subBtn').attr('disabled','true');
        $('#emailWarning').removeClass('d-none');
        console.log("false");
        return false;
      }
 });
 $('#phoneInput').keyup(function(e){
    var regex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/g;
    console.log($(e.target).val());
    let name=$(e.target).val();
    if (regex.test(name)) {
        console.log("true");
        $('#phoneWarning').addClass('d-none');
        valid[2]=true;
        let counter =0;
        for(let i =0 ; i<valid.length ;i++){
            if(valid[i]==true){
                counter++;
            }
        }
        if(counter===6){
            console.log('trueeeeeeeeeeeeeeeeeeee');
            $('#subBtn').removeAttr('disabled');
        }
        console.log(valid);
        return true;
      } else {
        valid[2]=false;
        console.log(valid);
        $('#subBtn').attr('disabled','true');
        $('#phoneWarning').removeClass('d-none');
        console.log("false");
        return false;
      }
 });
 $('#ageInput').keyup(function(e){
    var regex = /^[1-9][0-9]?$|^100$/g;
    console.log($(e.target).val());
    let name=$(e.target).val();
    if (regex.test(name)) {
        console.log("true");
        $('#ageWarning').addClass('d-none');
        valid[3]=true;
        let counter =0;
        for(let i =0 ; i<valid.length ;i++){
            if(valid[i]==true){
                counter++;
            }
        }
        console.log(valid);
        if(counter===6){
            console.log('trueeeeeeeeeeeeeeeeeeee');
            $('#subBtn').removeAttr('disabled');
        }
        return true;
      } else {
        valid[3]=false;
        console.log(valid);
        $('#subBtn').attr('disabled','true');
        $('#ageWarning').removeClass('d-none');
        console.log("false");
        return false;
      }
 });
 $('#passInput').keyup(function(e){
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/gm;
    console.log($(e.target).val());
    let name=$(e.target).val();
    if (regex.test(name)) {
        console.log("true");
        $('#passWarning').addClass('d-none');
        valid[4]=true;
        let counter =0;
        for(let i =0 ; i<valid.length ;i++){
            if(valid[i]==true){
                counter++;
            }
        }
        console.log(valid);
        if(counter===6){
            console.log('trueeeeeeeeeeeeeeeeeeee');
            $('#subBtn').removeAttr('disabled');
        }
        return true;
      } else {
        valid[4]=false;
        console.log(valid);
        $('#subBtn').attr('disabled','true');
        $('#passWarning').removeClass('d-none');
        console.log("false");
        return false;
      }
 });
 $('#rePassInput').keyup(function(e){
    // var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/gm;
    console.log($(e.target).val());    
    console.log($(e.target).val());    

    if($(e.target).val()===$('#passInput').val()){
        console.log('true');
        valid[5]=true;
        let counter =0;
        for(let i =0 ; i<valid.length ;i++){
            if(valid[i]==true){
                counter++;
            }
        }
        console.log(valid);
        if(counter===6){
            console.log('trueeeeeeeeeeeeeeeeeeee');
            $('#subBtn').removeAttr('disabled');
            // alert('hete');
        }
        $('#rePassWarning').addClass('d-none');
    }else{
        valid[5]=false;
        console.log(valid);
        $('#subBtn').attr('disabled','true');
        $('#rePassWarning').removeClass('d-none');
    }
    
 });

$('#contactLink').on('click',function(){
    $('#searchingContainer').addClass('d-none');
    $('#contactContainer').removeClass('d-none');
    // $('#displayRow').html('');
    $('#nameInput').val('');
    $('#emailInput').val('');
    $('#phoneInput').val('');
    $('#ageInput').val('');
    $('#passInput').val('');
    $('#rePassInput').val('');
    $("#sideContainer").animate(
        { width: "toggle", paddingInline: "toggle" },
        500
      );
      $("#toggleButton").addClass("fa-bars");
    $("#toggleButton").removeClass("fa-times");
});