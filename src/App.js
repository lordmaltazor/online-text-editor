import React, { useState } from 'react';
import './App.css';
import downloadAsFile from 'download-as-file';

function App() {
    const [text, setText] = useState('');
    const [filename, setFilename] = useState('');

    const downloadFile = () => {
        downloadAsFile({
            data: text,
            filename: filename
        })
    }

    return (
        <div className="app">
            <header>
                <p className="file-name">Filename: </p>
                <input type="text" onChange={(e) => setFilename(e.target.value)} />

                <button className="download-button" onClick={downloadFile}>Download File</button>
            </header>

            <textarea onChange={(e) => setText(e.target.value)} placeholder="Type here!" spellCheck="false"></textarea>
        </div>
    );
}

export default App;
