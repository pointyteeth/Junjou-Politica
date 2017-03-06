characters = {
  "trump-kun": {
  	"profile": "characters/trump profile.png",
  	"image": "characters/trump profile.png"
  },
  "putin-senpai": {
  	"profile": "characters/putin profile.jpg",
  	"image": "characters/putin profile.jpg"
  }
};

$( document ).ready(function() {
    // Get canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Draw basic image
    var image = new Image();
    image.src = "sketches.png";
    image.onload = function () {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    // Load characters into character lists
    var newCharacter;
    var newTop;
    var newBottom;
    var topList = $("#tops");
    var bottomList = $("#bottoms");
    var template = $("#character-template");
    for (var character in characters) {
      // Create character
      newCharacter = template.clone();
      newCharacter.attr("id", character);
      newCharacter.find("img").attr("src", characters[character]["profile"]);
      newCharacter.find("p").text(character);
      // Create top version
      newTop = newCharacter.clone();
      newTop.click(function() {
        image.src = characters[this.id]["image"];
        image.onload = function () {
          ctx.drawImage(image, 430, 100, 200, 200);
        }
      });
      // Create bottom version
      newBottom = newCharacter.clone();
      newBottom.click(function() {
        image.src = characters[this.id]["image"];
        image.onload = function () {
          ctx.drawImage(image, 540, 300, 200, 200);
        }
      });
      // Add new characters to lists
      topList.append(newTop);
      bottomList.append(newBottom);
    }
    // Remove template
    template.remove();

});
