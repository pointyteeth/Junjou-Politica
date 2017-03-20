var characters = {
    "start seme": {
    	"image": "characters/start seme.png"
    },
    "start uke": {
      	"image": "characters/start uke.png"
      },
  "Trump": {
    "name": "trump-kun",
    "profile": "characters/trump profile.png",
  	"image": "characters/trump image.png"
  },
  "Clinton": {
    "name": "clinton-onee-san",
  	"profile": "characters/clinton profile.png",
  	"image": "characters/clinton image.png"
  },
  "Sanders": {
    "name": "sanders-chan",
  	"profile": "characters/sanders profile.png",
  	"image": "characters/sanders image.png"
  },
  "Obama": {
    "name": "obama-san",
  	"profile": "characters/obama profile.png",
  	"image": "characters/obama image.png"
  },
  "Putin": {
    "name": "putin-senpai",
  	"profile": "characters/putin profile.png",
  	"image": "characters/putin image.png"
  },
  "Pepe": {
    "name": "pepe",
  	"profile": "characters/pepe profile.png",
  	"image": "characters/pepe image.png"
  }
};

var effects = ["effects/steam.png", "effects/flowers.png"];
var effect = 0;

var seme = "start seme";
var uke = "start uke";
var images = {};
var ctx;
var mousePressed = false;
var startPoint = {"x": 0, "y": 0};
var newPoint = {"x": 0, "y": 0};
var bgH = 0 // Background hue value, out of 256
var HUE_RATE = 0.5; // Rate of change of the hue, in hue out of 256 to pixels moved by mouse
var bgL = 100; // Background lightness value, out of 100
var LIGHTNESS_RATE = 0.1; // Rate of change of the lightness, in percentage to pixels moved by mouse

// Run to draw scene with current values
function drawScene() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!mousePressed) {
        ctx.fillStyle = "hsl(" + bgH + ", 100%, " + bgL +"%)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    var sources = {
      scene: "scene.png",
      effects: effects[effect],
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
      newCharacter.find("img").attr("src", characters[character]["profile"]);
      newCharacter.find("p").text(characters[character]["name"]);
      // Create seme version
      newSeme = newCharacter.clone();
      newSeme.attr("id", "seme-" + character);
      newSeme.click(function(event) {
        $("#seme-" + seme).removeClass("character-selected");
        seme = $(this).attr("id").replace("seme-", "");
        $(this).addClass("character-selected");
        drawScene();
        ga('send', {
          hitType: 'event',
          eventCategory: 'Seme',
          eventAction: 'set',
          eventLabel: seme
        });
        ga('send', {
          hitType: 'event',
          eventCategory: 'Pairing',
          eventAction: 'set',
          eventLabel: seme + 'x' + uke
        });
      });
      // Create uke version
      newUke = newCharacter.clone();
      newUke.attr("id", "uke-" + character);
      newUke.click(function() {
        $("#uke-" + uke).removeClass("character-selected");
        uke = $(this).attr("id").replace("uke-", "");
        $(this).addClass("character-selected");
        drawScene();
        ga('send', {
          hitType: 'event',
          eventCategory: 'Uke',
          eventAction: 'set',
          eventLabel: uke
        });
        ga('send', {
          hitType: 'event',
          eventCategory: 'Pairing',
          eventAction: 'set',
          eventLabel: seme + 'x' + uke
        });
      });
      // Add new characters to lists
      semeList.append(newSeme);
      ukeList.append(newUke);
  }}
    // Remove template
    template.remove();

    // Change the canvas color
    $("#canvas").mousedown(function (mouse) {
        mousePressed = true;
        drawScene();
        startPoint["x"] = mouse.pageX - this.offsetLeft;
        startPoint["y"] = mouse.pageY - this.offsetTop;
    });
    $("#canvas").mousemove(function (mouse) {
        if (mousePressed) {
            newPoint["x"] = mouse.pageX - this.offsetLeft;
            newPoint["y"] = mouse.pageY - this.offsetTop;
            bgH = (bgH + HUE_RATE*(newPoint["x"] - startPoint["x"]))%256;
            bgL = Math.max(90, Math.min(100, (bgL - LIGHTNESS_RATE*(newPoint["y"] - startPoint["y"]))));//MAXsmthMIN0
            startPoint["x"] = newPoint["x"];
            startPoint["y"] = newPoint["y"];
            $("#canvas").css("background-color", "hsl(" + bgH + ", 100%, " + bgL +"%)");
            $("body").css("background-color", "hsla(" + bgH + ", 100%, " + bgL +"%, 0.4)");
        }
    });
    $("#canvas").mouseup(function (mouse) {
        mousePressed = false;
        drawScene();
    });
	$("#canvas").mouseleave(function (mouse) {
        mousePressed = false;
        drawScene();
    });

    // Switch the effects
    $("#canvas").click(function (mouse) {
        if((mouse.pageY - this.offsetTop)*(canvas.height/$("#canvas").height()) > canvas.height*0.75) {
          effect = (effect + 1)%effects.length;
          console.log(effect);
          drawScene();
        }
    });

    // Save the image
    $("#save-button").click(function() {
        var dataURL = canvas.toDataURL("image/png");
        window.open(dataURL);
        ga('send', {
          hitType: 'event',
          eventCategory: 'Button',
          eventAction: 'save',
        });
    });

    // Show and hide the about section
    $("#what-button").click(function() {
      $("#what").show();
      ga('send', {
        hitType: 'event',
        eventCategory: 'Button',
        eventAction: 'open',
        eventLabel: 'what'
      });
    });
    $("#close").click(function() {
        $("#what").hide();
        ga('send', {
          hitType: 'event',
          eventCategory: 'Button',
          eventAction: 'close',
          eventLabel: 'what'
        });
    });
    $("#what").hide();

});
