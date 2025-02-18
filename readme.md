# Free Tool Web Components

Free Tools built as a set of standalone web components. Built with [Lit](https://lit.dev/), [Tailwind](https://tailwindcss.com/) and [Rollup](https://rollupjs.org/).

## Getting Started

Make sure you have node installed, then you can just clone this repo and open in your terminal and run `npm install` to begin.

Once you have everything installed you can run `npm run dev` to start the Tailwind CLI, Rollup, and serve the web components to [localhost:300](http://localhost:3000/).

> If you add new components while running `npm run dev` you will need to re run the command for the watcher to detect these files.

### Project Structure

There are two folders in the project, `/src` and `/dist`. `/src` is the working folder that all of our components are in the `/src` folder. Tailwind styles are contained in the `/src/styles` folder. **If you want to edit the CSS file directly, only make changes to the `input.css` file. `output.css` is a generated Tailwind CSS file.

When you run `npm run dev` or `npm run build` the components and CSS in the `src` folder are bundled into individual components in the `/dist` folder. We **never** edit anything in the dist folder directly, but this *is* where we reference files if we want to import them.

For every component in the `/src` directory we generate one corresponding component in the dist folder (and when we build for production we also generate a map file).

### Viewing the Components

In the project root you will have an index.html file, when you run `npm run dev` this file is served on [localhost:300](http://localhost:3000/).

You can simply import components from the `/dist` folder, and then rerence them in the `index.html` file. For example, the following will import and then display the Hello World component.

``` HTML
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Lit Hello World</title>
        <script type="module" src="./dist/hello-world.js"></script>
    </head>
    <body>
        <hello-world></hello-world>
    </body>
</html>
```