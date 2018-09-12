// Native
const fs = require('fs');

// Vendor
const imagemin = require('imagemin');
const imageminPluginJpegtran = require('imagemin-jpegtran');
const imageminPluginPngquant = require('imagemin-pngquant');
const sharp = require('sharp');

// Utilities
const { getFilePath, getFilename, getFileExtension } = require('../utilities');

const resizer = (input, output, size, fit, keepName) => {
  const outputPath = getFilePath(output);
  const outputFilename = getFilename(output);
  const outputExtension = getFileExtension(output);

  const image = sharp(input);

  image
    .metadata()
    .then((metadata) => {
      let imageSizeWidth = metadata.width; // default
      let imageSizeHeight = null; // default, scale height to width

      if (size !== undefined) {
        if (fit) {
          // Size to fit (largest dimension)
          if (metadata.width > metadata.height) {
            imageSizeWidth = size;
            imageSizeHeight = null;
          } else {
            imageSizeWidth = null;
            imageSizeHeight = size;
          }
        } else {
          // Size to width
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
