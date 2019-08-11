# Custom theme for [Shoptet](https://www.shoptet.cz/) templates

When the **blank mode** is enabled, no CSS nor JavaScript files are served by [Shoptet](https://www.shoptet.cz/) servers.
With this tools you can simply create all necessary assets for fully functioning Shoptet e-shop template.

You can use this repository as a boilerplate, you can edit all files **within this repository** as you want:
* you can update Gruntfile to your needs or create your own
* you can use Gulp or other automation tool
* you don't have to use none of them and compile files directly from command line/editor 

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
*  `your_directory/theme/dist/project.css`
*  `your_directory/theme/dist/font-shoptet.css`
*  `your_directory/theme/dist/print.css`
*  `your_directory/theme/dist/build.min.js`

Also upload `shoptet.svg`, `shoptet.ttf` and `shoptet.woff` from template you are using,
e.g. `your_directory/assets/11/fonts/shoptet/`

## Include assets in your admin

Go to **HTML codes** page in your admin and paste following code there.
Don't forget to replace `classic.shoptet.cz` by URL of your e-shop.

### Header section
```html
<link rel="stylesheet" href="https://cdn.myshoptet.com/usr/classic.shoptet.cz/user/assets/main.css">
<link rel="stylesheet" href="https://cdn.myshoptet.com/usr/classic.shoptet.cz/user/assets/project.css">
<link rel="stylesheet" href="https://cdn.myshoptet.com/usr/classic.shoptet.cz/user/assets/font-shoptet.css">
<link rel="stylesheet" href="https://cdn.myshoptet.com/usr/classic.shoptet.cz/user/assets/print.css">
```
### Footer section
```html
<script src="https://cdn.myshoptet.com/usr/classic.shoptet.cz/user/assets/build.min.js">
```

That's all - now you have e-shop in blank mode, looking exactly same like in standard mode
(only web fonts are intentionally replaced by normal fonts).
It's up to you to make it differ.

## How to make custom change in theme

### Important notice

For continuous development and compatibility of your themes with Shoptet templates,
**don't ever edit any file in `your_directory/assets/` folder.**

### Very important notice
**Really _don't ever edit any file in `your_directory/assets/` folder_.**

### Example - change primary color of template

```shell
cd your_directory/theme
touch project-custom.less
touch project-variables-custom.less
```

Content of `project-custom.less`
```less
@import '../assets/11/css/project';
@import 'project-variables-custom';
```


Content of `project-variables-custom.less`
```less
@colorPrimary: orangered;
```

Update `your_directory/theme/Gruntfile.js`
```diff
                     compress: true,
                 },
                 files: {
-                    'dist/project.css': '../assets/' + templateNumber + '/css/project.less'
+                    'dist/project.css': 'project-custom.less'
                 }
             },
             font: {

```

Now recompile your CSS by `grunt` command and upload it to FTP.

By this pattern you can update also other CSS files:

* `main.css` is used for layout
* `project.css` is used for colors
* `font-shoptet.css` is used for icon font
* `build.min.js` contains all necessary JavaScript files that e-shop needs to work properly 
