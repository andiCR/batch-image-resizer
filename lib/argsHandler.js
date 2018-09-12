// Vendor
const { ArgumentParser } = require('argparse');

// Package
const pkg = require('../package.json');

const createParserArguments = () => {
  const parser = new ArgumentParser({
    version: pkg.version,
    addHelp: true,
    description: pkg.description,
  });

  // File or directory input flag
  parser.addArgument(['-i', '--input'], {
    help: 'Input file including path or input folder to recursively get input files from',
    required: true,
  });

  // File or directory output flag
  parser.addArgument(['-o', '--output'], {
    help: 'Output file including path or output folder to recursively write output files to',
    required: true,
  });

  // File dimensions flag
  parser.addArgument(['-s', '--sizes'], {
    help: 'File dimensions',
    required: false,
  });

  // Fit to dimension box (picks largest dimension and scales the other dimension accordingly)
  // By default all images are (up)scaled to the same width as specified by `[-s, --sizes]` (e.g. if ` -s "[500]"`, all image widths are 500px)
  // By enabling `[-f, --fit]` your images are not upscaled but rather sets the largest dimension (say height) to 500px and scales the other one accordingly
  parser.addArgument(['-f', '--fit'], {
    dest: 'fit',
    help: 'Enable fit to maximum dimension as specified by [-s, --sizes]',
    required: false,
    action: 'storeTrue',
  });

  // Keep filenames unchanged (do not append width)
  // This is only useful when you are resizing to a single size because otherwise it would overwrite the output images
  parser.addArgument(['-k', '--keep-name'], {
    dest: 'keepName',
    help: 'Disable appending size into name, e.g. -1500w (only useful when you are resizing to a single size)',
    required: false,
    action: 'storeTrue',
  });

  const args = parser.parseArgs();

  return args;
};

const args = createParserArguments();

module.exports = args;
