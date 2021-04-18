// These are the files that are accepted when you click the "open file" button

const openFileOptions = {
    types: [ // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
        {
            description: 'Text files',
            accept: {
                'text/plain': ['.txt'],
            },
        },
        {
            description: 'HTML files',
            accept: {
                'text/html': ['.js'],
            },
        },
        {
            description: 'CSS files',
            accept: {
                'text/css': ['.js'],
            },
        },
        {
            description: 'Javascript files',
            accept: {
                'text/javascript': ['.js'],
            },
        },
    ]
};

export default openFileOptions;