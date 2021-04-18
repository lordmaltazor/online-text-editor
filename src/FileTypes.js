// The "name" is displayed in the statusbar and such, 
// "extension" is used for getting the language of a new file 
// And "language" is used for the CodeMirror editor linting

const fileTypes = [
    {
        name: 'Text file',
        extension: '.txt',
        language: 'text'
    },
    {
        name: 'HTML file',
        extension: '.html',
        language: 'xml'
    },
    {
        name: 'CSS file',
        extension: '.css',
        language: 'css'
    },
    {
        name: 'Javascript file',
        extension: '.js',
        language: 'javascript'
    },
];

export default fileTypes;