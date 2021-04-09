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

    const [showOutput, setShowOutput] = useState(true); // Whether or not the output box is shown

    const openFile = async () => {
        const options = {
            types: [
                {
                    description: 'Javascript Files',
                    accept: {
                        'text/javascript': ['.js'],
                    },
                },
            ],
        };

        const files = await window.showOpenFilePicker(options);
        const file = await files[0].getFile();
        const text = await file.text();

        setCode(text);
    }

    const downloadFile = () => {
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

        setShowOutput(true);

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

    const toggleOutputBox = () => {
        setShowOutput(!showOutput);
    }

    return (
        <div className="app">
            <header>
                <button className="header-button" onClick={openFile}>Open File</button>

                <button className="header-button download-file-button">
                    <p>Download File</p>
                    <div className="enter-filename">
                        <p className="filename">Filename: </p>
                        <input type="text" onChange={(e) => setFilename(e.target.value)} ref={filenameInput} />
                        <button className="header-button enter-filename-button" onClick={downloadFile}>Enter</button>
                    </div>
                </button>

                <button className="header-button" onClick={() => window.open('https://github.com/lordmaltazor/online-text-editor', '_blank')}>Github</button>
                <button className="header-button" onClick={help}>Help</button>
                <button className="header-button" onClick={runCode}>Run</button>
                <div className="header-spacer"></div>
                <button className="header-button" onClick={toggleOutputBox}>{showOutput ? 'Hide' : 'Show'}</button>
            </header>

            <section className="main-section">
                <Editor value={code} onChange={setCode} />

                {showOutput && <div className="output" style={{ color: error ? "red" : 'white' }}>{output}</div>}
            </section>
        </div>
    );
}

export default App;
