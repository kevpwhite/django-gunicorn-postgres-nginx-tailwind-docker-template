module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    enabled: false, //true for production build
    content: [
        '../**/templates/*.html',
        '../**/templates/**/*.html',
        './templates/**/*.html',
        './node_modules/flowbite/**/*.js'
    ]
    ,
    theme: {
        extend: {
            colors: {
                'primary-color': '#285430',
                'second-color': '#5F8D4E',
                'third-color': '#A4BE7B',
                'fourth-color': '#E5D9B6',
                'fith-color': '#333333',
              },
        },
    },
    variants: {},
    plugins: [ 
        require('tw-elements/dist/plugin'), 
        require('autoprefixer'),
        require('flowbite/plugin')
    ], 
}