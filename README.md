# Batch image resizer

[![npm version](https://badge.fury.io/js/batch-image-resizer.svg)](https://badge.fury.io/js/batch-image-resizer)
[![dependencies](https://david-dm.org/timvanscherpenzeel/batch-image-resizer.svg)](https://david-dm.org/timvanscherpenzeel/batch-image-resizer)
[![devDependencies](https://david-dm.org/timvanscherpenzeel/batch-image-resizer/dev-status.svg)](https://david-dm.org/timvanscherpenzeel/batch-image-resizer#info=devDependencies)

CLI tool for resizing images using [sharp](https://github.com/lovell/sharp) and optimizing `jpg` and `png` files using [imagemin](https://github.com/imagemin/imagemin). The CLI tool does not require `imagemagick` or `graphicsmagick` to be installed.

Supports both single files as well as recursive file finding and processing using a glob pattern.

## Installation

```sh
$ npm install
```

## Example

Using the `-s` flag followed by an array of numbers one can specify (in pixels) the image sizes one wants to resize their image(s) to.

The input flag `-i` takes either a single parent directory or a single file. The script will recursivly find a copy all suitable input files in all child directories. The folder structure of the input folder is retained in the output folder. Please note that this does not happen in-place but rather in the output directory.

Running the following command turns
```sh
$ node ./bin/batch-image-resizer.js -i ./input -o ./output -s "[50, 500, 1000, 1500]"
```

This as input (root with a single image, a parent folder which has a single image and a child folder of the parent which contains a single image).

```sh
root
├── example-1.jpg
└── parent
    ├── child
    │   └── example-3.jpg
    └── example-2.jpg
```

Will in turn generate this as output (root with single image converted in various formats, a parent folder which contains a single image converted in various formats and a child folder of the parent which contains a single image converted in various formats).

```sh
root
├── example-1-1000w.jpg
├── example-1-1500w.jpg
├── example-1-500w.jpg
├── example-1-50w.jpg
└── parent
    ├── child
    │   ├── example-3-1000w.jpg
    │   ├── example-3-1500w.jpg
    │   ├── example-3-500w.jpg
    │   └── example-3-50w.jpg
    ├── example-2-1000w.jpg
    ├── example-2-1500w.jpg
    ├── example-2-500w.jpg
    └── example-2-50w.jpg
```

Alternatively one could specify a single file as input rather than a directory.

```sh
$ node ./bin/batch-image-resizer.js -i ./input/example.png -o ./output/example.png -s "[50, 500, 1000, 1500]"
```

## Flags

### Default
	-v, --version [print version number]
	-h, --help [print help]

### Required
	-i, --input [example: -i ./input/example.png] [example: -i ./input] [required]
	-o, --output [example: -o ./output/example.png] [example: -o ./output] [required]

### Optional
	-s, --sizes [example: -s "[50, 500, 1000, 1500]"] [not required]
	-f, --fit [fit to largest dimension, either width or height] [not required]
	-k, --keep-name [do not rename files] [not required]

## Formats

```html
<img
	alt="Example image description"
	srcset="example-500w.jpg 500w, example-1000w.jpg 1000w, example-1500w.jpg 1500w"
	src="example-1000w.jpg"
/>

<picture>
	<source srcset="example-500w.webp 500w, example-1000w.webp 1000w, example-1500w.webp 1500w" type="image/webp">
	<source srcset="example-500w.jpg 500w, example-1000w.jpg 1000w, example-1500w.jpg 1500w" type="image/jpeg">
	<img src="example-500w.jpg" alt="Example image description">
</picture>
```

## Licence

My work is released under the [MIT license](https://raw.githubusercontent.com/TimvanScherpenzeel/batch-image-resizer/master/LICENSE).
