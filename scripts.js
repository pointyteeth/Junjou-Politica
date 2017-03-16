characters = {
    "start seme": {
    	"image": "characters/start seme.png"
    },
    "start uke": {
      	"image": "characters/start uke.png"
      },
  "trump-kun": {
  	"profile": "characters/trump profile.png",
  	"image": "characters/trump image.png"
  },
  "clinton-onee-san": {
  	"profile": "characters/clinton profile.png",
  	"image": "characters/clinton image.png"
  },
  "sanders-chan": {
  	"profile": "characters/sanders profile.png",
  	"image": "characters/sanders image.png"
  },
  "obama-san": {
  	"profile": "characters/obama profile.png",
  	"image": "characters/obama image.png"
  },
  "putin-senpai": {
  	"profile": "characters/putin profile.png",
  	"image": "characters/putin image.png"
  },
  "pepe": {
  	"profile": "characters/pepe profile.png",
  	"image": "characters/pepe image.png"
  }
};

var seme = "start seme";
var uke = "start uke";
var images = {};
var ctx;

// Run to draw scene with current values
function drawScene() {

    var sources = {
      scene: "scene.png",
      effects: "effects.png",
      seme: characters[seme]["image"],
      uke: characters[uke]["image"]
    };

    function loadImages(sources, callback) {
      var loadedImages = 0;
      var numImages = 0;
      // get num of sources
      for(var source in sources) {
        numImages++;
      }
      for(var source in sources) {
        images[source] = new Image();
        images[source].onload = function() {
          if(++loadedImages >= numImages) {
            callback(images);
          }
        };
        images[source].src = sources[source];
      }
    }


    loadImages(sources, function(images) {
      ctx.drawImage(images.scene, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(images.seme, 333, 41, 320, 320);
      ctx.save();
      ctx.translate(503, 156);
      ctx.rotate(0.345);
      ctx.drawImage(images.uke, 0, 0, 320, 320);
      ctx.restore();
      ctx.drawImage(images.effects, 0, 0, canvas.width, canvas.height);
    });

}

$( document ).ready(function() {

    // Get canvas
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    drawScene();

    // Load characters into character lists
    var newCharacter;
    var semeList = $("#semes");
    var ukeList = $("#ukes");
    var template = $("#character-template");
    for(var character in characters) { if("profile" in characters[character]) {
      // Create character
      newCharacter = template.clone();
      newCharacter.attr("id", character);
      newCharacter.find("img").attr("src", characters[character]["profile"]);
      newCharacter.find("p").text(character);
      // Create seme version
      newSeme = newCharacter.clone();
      newSeme.attr("id", character)
      newSeme.click(function(event) {
        $("#semes #" + seme).removeClass("character-selected");
        seme = $(this).attr("id");
        $(this).addClass("character-selected");
        drawScene();
      });
      // Create uke version
      newUke = newCharacter.clone();
      newUke.click(function() {
        $("#ukes #" + uke).removeClass("character-selected");
        uke = $(this).attr("id");
        $(this).addClass("character-selected");
        drawScene();
      });
      // Add new characters to lists
      semeList.append(newSeme);
      ukeList.append(newUke);
  }}
    // Remove template
    template.remove();

});
