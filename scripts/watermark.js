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
    applyWatermark({
        'author': author.value,
        'authorColor': authorColor.value,
        'title': title.value,
        'titleColor': titleColor.value,
        'coverImage': uCoverImage.files[0],
        'watermarkImage': uWatermark.files[0],
    });

}, false);

// Download the image.
downloadImage.addEventListener("click", function(e) {
    
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
        //console.log(document.getElementById('alpha-image'));
        });
}

/*
watermark([uCoverImage, uWatermark], options)
  .image(watermark.image.lowerRight(0.5))
  .then(function (img) {
    document.getElementById('alpha-image').appendChild(img);
    //console.log(document.getElementById('alpha-image'));
  });
  
*/
  
/*

watermark(['http://web.com/a.jpg', 'http://web.com/b.jpg'], options);

// load a url and a file object
var upload = document.querySelector('input[type=file]').files[0];
watermark(['/img/photo.jpg', upload]);
*/