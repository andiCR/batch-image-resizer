// Native
const fs = require('fs');

// Vendor
const imagemin = require('imagemin');
const imageminPluginJpegtran = require('imagemin-jpegtran');
const imageminPluginPngquant = require('imagemin-pngquant');
const sharp = require('sharp');

// Utilities
const { getFilePath, getFilename, getFileExtension } = require('../utilities');

const resizer = (input, output, size = false, fit = false, keepName = false) => {
  const outputPath = getFilePath(output);
  const outputFilename = getFilename(output);
  const outputExtension = getFileExtension(output);

  const image = sharp(input);

  image
    .metadata()
    .then((metadata) => {
      let imageSizeWidth = metadata.width; // default
      let imageSizeHeight = null; // default, scale height to width

      if (size) {
        if (fit) {
          // Fit to dimension box (picks largest dimension and scales the other one accordingly)
          // By enabling `[-f, --fit]` your images are not upscaled but rather sets
          // the largest dimension (say height) to 500px and scales the other one accordingly
          if (metadata.width > metadata.height) {
            imageSizeWidth = size;
            imageSizeHeight = null;
          } else {
            imageSizeWidth = null;
            imageSizeHeight = size;
          }
        } else {
          // Size to width (default)
          // By default all images are (up)scaled to the same width as specified by
          // `[-s, --sizes]` (e.g. if ` -s "[500]"`, all image widths are 500px)
          imageSizeWidth = size;
        }
      }

      return image.resize(imageSizeWidth, imageSizeHeight).toBuffer();
    })
    .then(data => imagemin.buffer(data, {
      plugins: [imageminPluginJpegtran(), imageminPluginPngquant()],
    }))
    .then((outputBuffer) => {
      const append = keepName || fit ? '' : `-${size}w`;

      const filenameStructure = `${outputPath}${outputFilename}${size ? append : ''}${outputExtension}`;

      fs.writeFile(filenameStructure, outputBuffer, (error) => {
        if (!error) {
          console.log(`Written file to ${filenameStructure}`);
        } else {
          console.error(error);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = resizer;
