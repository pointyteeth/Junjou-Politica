$( document ).ready(function() {
    console.log( "ready!" );

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.src = "sketches.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
});
