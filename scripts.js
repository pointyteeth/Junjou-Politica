characters = {
  "trump-kun": {
  	"profile": "pepe.jpg",
  	"image": "pepe.jpg"
  },
  "putin-senpai": {
  	"profile": "pepe.jpg",
  	"image": "pepe.jpg"
  }
};

$( document ).ready(function() {
    // Get canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Draw basic image
    var img = new Image();
    img.src = "sketches.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    // Load characters into character lists
    for (var character in characters) {
      //TODO add entry into each list, with id as list selector
      //alert(characters[character]["profile"]);
    }

});
