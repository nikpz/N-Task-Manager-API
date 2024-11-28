//We are going to have PostCSS process our css and generate a new css file.
const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        //to allow us to break up our css across multiple files.
        require('postcss-import'),
        tailwindcss('./tailwind.js'),
        //to parse our CSS and add vendor prefixes to CSS rules using values from CanIUse.com
        require('autoprefixer'),
    ],
};
