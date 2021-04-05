import React, { useState } from 'react';
import './App.css';
import downloadAsFile from 'download-as-file';
import EditorJS from '@editorjs/editorjs';

function App() {
    const [text, setText] = useState('');
    const [filename, setFilename] = useState('');

    const [output, setOutput] = useState(''); // The output of the users code
    const [error, setError] = useState(false); // Whether or not the was an error in the user's code

    const updateCode = (e) => {
        setText(e.target.value);
    }

    const downloadFile = () => {
        downloadAsFile({
            data: text,
            filename: filename
        })
    }

    const runCode = () => {
        try {
            setOutput(eval(text));
            setError(false);
        }
        catch (err) {
            //console.log(err);

            setOutput(`${err.name}: ${err.message}`);
            setError(true);
        }
    }

    return (
        <div className="app">
            <header>
                <p className="file-name">Filename: </p>
                <input type="text" onChange={(e) => setFilename(e.target.value)} />

                <button className="header-button" onClick={downloadFile}>Download File</button>
                <button className="header-button" onClick={runCode}>Run</button>
            </header>

            <section className="main-section">
                <textarea onChange={updateCode} placeholder="Type your Javascript code here!" spellCheck="false"></textarea>

                <div className="output" style={{ color: error ? "red" : 'white' }}>{output}</div>
            </section>
        </div>
    );
}

export default App;
