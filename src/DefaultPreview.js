const defaultPreview = `
    <html>
    <body><p>
        You have to have an HTML file open for the website preview to work! 
        Click the "File" button in the navigation-bar and "Save As". 
        Then save it somewhere on your computer as an HTML file 
    </p></body>            
    <style>
        html, body
        {
            height: 100%;
        }
        
        body
        {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        p
        {
            width: 50%;
            font-size: 30px;
            font-family: sans-serif;
            text-align: center;
        }
    </style>
    </html>
`;

export default defaultPreview;