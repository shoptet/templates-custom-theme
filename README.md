# Custom theme for [Shoptet](https://www.shoptet.cz/) templates

When the **blank mode** is enabled, no CSS neihter JavaScript files are served by [Shoptet](https://www.shoptet.cz/) servers.
With this tools you can simply create all necessary assets for fully functioning [Shoptet](https://www.shoptet.cz/) online store template.

* you can create `userConfig.json` and use it as described in example below
* you can use Gulp or other automation tool
* you don't have to use Grunt nor Gulp and compile files directly from command line/editor
* but, first of all, you can use this repository as a inspiration

## Prerequisites

[NodeJS](https://nodejs.org/)

[GruntJS](https://gruntjs.com/)

## Creating assets

```shell
npm install -g grunt-cli
cd your_directory
git clone git@github.com:Shoptet/templates-assets.git assets
git clone git@github.com:Shoptet/templates-custom-theme.git theme
cd theme
npm install
grunt
``` 

Your assets are now ready in `your_directory/theme/dist` folder.

## Upload assets to FTP

Upload following files to FTP to folder `assets`:

*  `your_directory/theme/dist/main.css`
*  `your_directory/theme/dist/build.min.js`

Also upload:

* `shoptet.svg`, `shoptet.ttf` and `shoptet.woff` from template you are using,
e.g. `your_directory/assets/11/fonts/shoptet/` to folder `fonts`
* folder `your_directory/assets/00/img`

## Include assets in your admin

Go to **HTML codes** page in your admin and paste following code there.
Don't forget to replace `classic.shoptet.cz` by URL of your online store.

### Header section
```html
<link rel="stylesheet" href="https://cdn.myshoptet.com/usr/classic.shoptet.cz/user/assets/main.css">
```
### Footer section
```html
<script src="https://cdn.myshoptet.com/usr/classic.shoptet.cz/user/assets/build.min.js">
```

That's all - now you have online store in blank mode, looking exactly same like in standard mode
(only web fonts are intentionally replaced by normal fonts).
It's up to you to make it differ.

## How to make custom change in theme

### Important notice

For continuous development and compatibility of your themes with [Shoptet](https://www.shoptet.cz/) templates,
**don't ever edit any file in `your_directory/assets/` folder.**

### Very important notice
**Really _don't ever edit any file in `your_directory/assets/` folder_.**

### Example - change primary color of template

```shell
cd your_directory/theme
touch project-variables-custom.less
touch project-custom.less
touch userConfig.json
```

We need to set new value to `@colorPrimary` variable in
`project-variables-custom.less`:

```less
@colorPrimary: orangered;
```

Then we need to load original project files along with
our newly set variable in `project-custom.less`:

```less
@import '../assets/11/css/project';
@import 'project-variables-custom';
```

And finally we have to use our custom file in build process -
this is what the `userConfig.json` does:

```json
{
  "css": {
    "dist/main.css": [
        "../assets/11/css/main.less",
        "project-custom.less",
        "../assets/11/css/font-shoptet.less"
      ]
  }
}

```

Now recompile your CSS by `grunt` command and upload it to FTP.

### About source LESS files

* `main.less` is used for layout
* `project.less` is used for colors
* `font-shoptet.less` is used for  Shoptet icon font

### About source JavaScript files

Section `concatJS.src` of `package.json` contains all JavaScript files
that online store needs to work properly. By default are compiled to
`build.min.js`. 
