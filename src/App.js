import React, { useState, useRef } from 'react';
import './App.css';
import downloadAsFile from 'download-as-file';
import Editor from './Editor';

function App() {
    const filenameInput = useRef(null);

    const [code, setCode] = useState('');
    const [filename, setFilename] = useState('');

    const [output, setOutput] = useState(''); // The output of the users code
    const [error, setError] = useState(false); // Whether or not the was an error in the user's code

    const downloadFile = () => {
        if (code === '') {
            alert("Type something in the code editor before downloading your script!");

            return;
        }
        else if (filename === '') {
            alert("You have to choose a name for your script!");

            return;
        }

        downloadAsFile({
            data: code,
            filename: `${filename}.js`
        })

        filenameInput.current.value = '';
    }

    const runCode = () => {
        if (code === '') {
            alert("Type something in the code editor before running your code!");

            return;
        }

        try {
            setOutput(eval(code));
            setError(false);
        }
        catch (err) {
            //console.log(err);

            setOutput(`${err.name}: ${err.message}`);
            setError(true);
        }
    }

    const help = () => {
        alert("Just type your Javascript in the editor, and you will see the output in the panel to the right. When you're done with the code, you can choose a file name and download the script if you want to.");
    }

    return (
        <div className="app">
            <header>
                <p className="file-name">Filename: </p>
                <input type="text" onChange={(e) => setFilename(e.target.value)} ref={filenameInput} />

                <button className="header-button" onClick={downloadFile}>Download File</button>
                <button className="header-button" onClick={() => window.open('https://github.com/lordmaltazor/online-text-editor', '_blank')}>Github</button>
                <button className="header-button" onClick={help}>Help</button>
                <button className="header-button" onClick={runCode}>Run</button>
            </header>

            <section className="main-section">
                {/*<textarea onChange={updateCode} placeholder="Type your Javascript code here!" spellCheck="false"></textarea>*/}
                <Editor value={code} onChange={setCode} />

                <div className="output" style={{ color: error ? "red" : 'white' }}>{output}</div>
            </section>
        </div>
    );
}

export default App;
