// browserify scripts/watermark.js > scripts/watermark.bundle.js

var watermark = require('../node_modules/watermarkjs');

var author          = document.querySelector("#author"),
    authorColor     = document.querySelector("#author-color"),
    authorPosX      = document.querySelector("#author-position-x"),
    authorPosY      = document.querySelector("#author-position-y"),
    title           = document.querySelector("#title"),
    titleColor      = document.querySelector("#title-color"),
    titlePosX       = document.querySelector("#title-position-x"),
    titlePosY       = document.querySelector("#title-position-y"),
    uCoverImage     = document.querySelector("#cover-image"),
    uWatermark      = document.querySelector("#watermark"),
    uWatermarkOp    = document.querySelector("#watermark-opacity"),
    uWatermarkPosX  = document.querySelector("#watermark-position-x"),
    uWatermarkPosY  = document.querySelector("#watermark-position-y"),
    processImage    = document.querySelector("#proccess-image"),
    downloadImage   = document.querySelector("#download-image");
    
// Process the image.
processImage.addEventListener("click", function(e) {
    if (!uCoverImage.files[0] || !uWatermark.files[0]) {
        console.log('Imagem não definida.');
        return;
    }

    applyWatermark({
        'author': author.value,
        'authorColor': authorColor.value,
        'authorPosX': authorPosX.value,
        'authorPosY': authorPosY.value,
        'title': title.value,
        'titleColor': titleColor.value,
        'titlePosX': titlePosX.value,
        'titlePosY': titlePosY.value,
        'coverImage': uCoverImage.files[0],
        'watermarkImage': uWatermark.files[0],
        'watermarkOpacity': uWatermarkOp.value,
        'watermarkPosX': uWatermarkPosX.value,
        'watermarkPosY': uWatermarkPosY.value,
    });

}, false);

function applyWatermark(infoToProcess) {
    console.log(infoToProcess);

    var options = {
        init: function (img) {
            img.crossOrigin = null;
        }
    };

    var authorPosX = function(image1, image2, context) {
      return infoToProcess.authorPosX;
    };
    
    var authorPosY = function(image1, image2, context) {
      return infoToProcess.authorPosY;
    };

    var titlePosX = function(image1, image2, context) {
      return infoToProcess.titlePosX;
    };
    
    var titlePosY = function(image1, image2, context) {
      return infoToProcess.titlePosY;
    };
    
    var watermarkPosX = function(image1, image2) {
      return infoToProcess.watermarkPosX;
    };
    
    var watermarkPosY = function(image1, image2) {
      return infoToProcess.watermarkPosY;
    };


    watermark([infoToProcess.coverImage, infoToProcess.watermarkImage], options)
        .image(watermark.image.atPos(
            watermarkPosX,
            watermarkPosY,
            infoToProcess.watermarkOpacity
        ))
        .render()
        .image(watermark.text.atPos(
            authorPosX,
            authorPosY,
            infoToProcess.author,
            '16px Aladin, cursive',
            infoToProcess.authorColor,
            1
        ))
        .render()
        .image(watermark.text.atPos(
            titlePosX,
            titlePosY,
            infoToProcess.title,
            '30px Aladin, cursive',
            infoToProcess.titleColor,
            1
        ))  
        .then(function (img) {
            img.id = "new-image";
            downloadImage.style.display = "block";

            document.getElementById('result-image').innerHTML = '';
            document.getElementById('result-image').appendChild(img);
            downloadImage.href = document.getElementById('new-image').src;
        });
}