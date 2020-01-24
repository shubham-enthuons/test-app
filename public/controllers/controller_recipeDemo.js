angular.module("recipeAppDemo").controller("recipeCtrlDemo", function ($scope ,$sce,$document,$translate,$location,$window,$rootScope, $routeParams, $http , $timeout, checkDomChange) {

Wix.pushState("recipe/"+$routeParams.name);       
var instanceIdCons='5cb5d9b2-040b-446a-a14d-e8c8d0eb8fb1'
$scope.recipeName = $routeParams.name


  $scope.socialSettings =
  {
"showFacebook": true,
"showTwitter": true,
"showPinterest": true,
"showGoogle": true
  }

/*$window.onpopstate = function(event) {
  console.log($location.absUrl())
};
*/
    var promiseGetData = $http.get("/getRecipe/" + instanceIdCons);
    promiseGetData.then(function(payload){
        var theRecipeName = $scope.recipeName;

        var str = theRecipeName
        /*if (str.indexOf("-") !== -1){str = str.replace(/-/g, '')}
        if (str.indexOf(" ") !== -1){str = str.replace(/\s/g, '')}*/
        var theRecipes = payload.data;
      $scope.index = getIndexOfKey(theRecipes,str)
      if(theRecipes[$scope.index].videoURL != ''){$scope.trustedVideo = $sce.trustAsResourceUrl(theRecipes[$scope.index].videoURL);}
      $scope.recipes=payload.data;
      if (Wix.Utils.getViewMode()== 'site')
      {
      Wix.setPageMetadata({
        title: theRecipes[$scope.index].recipeName,
        description: theRecipes[$scope.index].shortDescription
      });
    }

          })
   


function getIndexOfId(recipes, id){
for (var i = 0; i < recipes.length; i++)
{
  var str1= recipes[i].id
    if (str1 == id)
    {
        return i;
    }
}
    
    return -1;
}

function getIndexOfKey(recipes, theRecipeName){
for (var i = 0; i < recipes.length; i++)
{
  var str1= recipes[i].UUID
 /* if (str1.indexOf("-") !== -1){str1 = str1.replace(/-/g, '')}
  if (str1.indexOf(" ") !== -1){str1 = str1.replace(/\s/g, '')}*/
    if (str1 == theRecipeName)
    {
        return i;
    }
}
    
    return -1;
}
    
    var promiseGetData = $http.get("/getSettings/" + instanceIdCons);
    promiseGetData.then(function(payload){
      settings=payload.data;
      $scope.settings=payload.data;
    /*  console.log(settings)
      console.log(settings.disp_RecipePage_SearchBox)*/
      $scope.settings.disp_RecipeDetail_SocialShare = settings.disp_RecipeDetail_SocialShare
      $scope.settings.disp_RecipeDetail_Tags = settings.disp_RecipeDetail_Tags
      $scope.settings.recipeDetPage_font = settings.recipeDetPage_font
      $scope.settings.det_bodyColor = settings.det_bodyColor
      $scope.settings.det_ingreColor = settings.det_ingreColor
       $timeout(function(){
          $translate.use($scope.settings.appLangCode || 'en')
      },0)

    })

     $scope.gotoHome = function(){
    $location.path("/");
    };
    $scope.gotoFacebook = function(recipe){

    Wix.getSiteInfo(function(siteInfo){
      var siteURL = siteInfo.url
      console.log(siteURL)
      var facebookURL = "https://www.facebook.com/sharer/sharer.php?u="+encodeURI(siteURL)+"&t="+encodeURI(recipe.recipeName)
      $window.open(facebookURL, "_blank")
    })
    
  }
    $scope.gotoTwitter = function(recipe){

    Wix.getSiteInfo(function(siteInfo){
      var siteURL = siteInfo.url
      var twitterURL = "https://twitter.com/share?url="+encodeURI(siteURL)+"&text="+encodeURI(recipe.recipeName)
      $window.open(twitterURL, "_blank")
    })
    
  }

  $scope.gotoPinterest = function(recipe){
    Wix.getSiteInfo(function(siteInfo){
      var siteURL = siteInfo.url
      console.log(siteURL)
      var pinterestURL = "https://pinterest.com/pin/create/button/?url="+encodeURI(siteURL)+"&media="+encodeURI(recipe.recipeImageSrc)+"&description="+encodeURI(recipe.shortDescription)
      console.log(pinterestURL)
      $window.open(pinterestURL, "_blank")
    })
    
  }

    $scope.gotoGoogle = function(recipe){

    Wix.getSiteInfo(function(siteInfo){
      var siteURL = siteInfo.url
      var googleURL = "https://plus.google.com/share?url="+encodeURI(siteURL)
      $window.open(googleURL, "_blank")
    })
    
  }

    Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, function(e) {
      console.log(e.key +"and "+ e.value);

      if (e.key == "disp_RecipeDetail_SocialShare")
      {
      $timeout(function(){
      $scope.settings.disp_RecipeDetail_SocialShare = e.value
      $http.put("/updateSettings/"+ instanceIdCons, $scope.settings).success(function(response){
      console.log(response);
      })
      },0)
      }
      if (e.key == "disp_RecipeDetail_Tags")
      {
      $timeout(function(){
      $scope.settings.disp_RecipeDetail_Tags = e.value
      $http.put("/updateSettings/"+ instanceIdCons, $scope.settings).success(function(response){
      console.log(response);
      })
      },0)
      }
      if (e.key == "recipeDetPage_font")
      {
      $timeout(function(){
      $scope.settings.recipeDetPage_font = e.value.family
      $http.put("/updateSettings/"+ instanceIdCons, $scope.settings).success(function(response){
      console.log(response);
      })
      },0)
      }
      if (e.key == "det_bodyColor")
      {
      $timeout(function(){
      $scope.settings.det_bodyColor = e.value.color
      $http.put("/updateSettings/"+ instanceIdCons, $scope.settings).success(function(response){
      console.log(response);
      })
      },0)
      }
      if (e.key == "det_ingreColor")
      {
      $timeout(function(){
      $scope.settings.det_ingreColor = e.value.color
      $http.put("/updateSettings/"+ instanceIdCons, $scope.settings).success(function(response){
      console.log(response);
      })
      },0)
      }
      if (e.key == "appLang")
      {
      $timeout(function(){
      $scope.settings.appLangCode = (e.value).split("!!")[0]
      $scope.settings.appLang = (e.value).split("!!")[1]
       $http.put("/updateSettings/"+ instanceIdCons, $scope.settings).success(function(response){
      console.log(response);
        $timeout(function(){
           $translate.use($scope.settings.appLangCode || 'en')
        },0)
      })
      },0)
      }

    });
 //checkDomChange.checkDomChange();

 $timeout(function () {
        checkDomChange.checkDomChange();
        /*Wix.setHeight(1000);  
       $timeout(function () {
        console.log("this gets executed from recipeCTRL")
              var height1 = $document.height();
              Wix.setHeight(height1);
          },0);*/
       },0);

/*$timeout(function () {
            Wix.setHeight($("body[ng-app='recipeApp']").height() + 20);
    $timeout(function (){
                    Wix.setHeight($("body[ng-app='recipeApp']").height() + 20);
              }, 1000);
                  }, 1000);*/
});
