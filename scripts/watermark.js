// browserify scripts/watermark.js > scripts/watermark.bundle.js

var watermark = require('../node_modules/watermarkjs');

var author        = document.querySelector("#author"),
    authorColor   = document.querySelector("#author-color"),
    title         = document.querySelector("#title"),
    titleColor    = document.querySelector("#title-color"),
    uCoverImage   = document.querySelector("#cover-image"),
    uWatermark    = document.querySelector("#watermark"),
    processImage  = document.querySelector("#proccess-image"),
    downloadImage = document.querySelector("#download-image");
    
// Process the image.
processImage.addEventListener("click", function(e) {
    if (!uCoverImage.files[0] || !uWatermark.files[0]) {
        console.log('Imagem não definida.');
        return;
    }

    applyWatermark({
        'author': author.value,
        'authorColor': authorColor.value,
        'title': title.value,
        'titleColor': titleColor.value,
        'coverImage': uCoverImage.files[0],
        'watermarkImage': uWatermark.files[0],
    });

}, false);

function applyWatermark(infoToProcess) {
    console.log(infoToProcess);

    var options = {
        init: function (img) {
            img.crossOrigin = null;
        }
    };

    watermark([infoToProcess.coverImage, infoToProcess.watermarkImage], options)
        .image(watermark.image.center(0.5))
        .render()
        .image(watermark.text.lowerLeft(
            infoToProcess.author,
            '16px Josefin Slab',
            infoToProcess.authorColor,
            1
        ))
        .render()
        .image(watermark.text.lowerRight(
            infoToProcess.title,
            '30px Josefin Slab',
            infoToProcess.titleColor,
            1
        ))     
        .then(function (img) {
            img.id = "new-image";
            downloadImage.style.display = "block";

            document.getElementById('result-image').appendChild(img);
            downloadImage.href = document.getElementById('new-image').src;
        });
}