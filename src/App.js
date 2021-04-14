import React, { useState, useRef } from 'react';
import './App.css';
import downloadAsFile from 'download-as-file';
import Editor from './Editor';

function App() {
    const filenameInput = useRef(null);

    const [fileHandler, setFileHandler] = useState(null); // The file handler that we use to write to
    const [fileName, setFileName] = useState(null); // The name of the file we're currently working on

    const [code, setCode] = useState('');
    const [chosenFileName, setChosenFileName] = useState('');
    const [fileExtension, setFileExtension] = useState('');
    const [fileType, setFileType] = useState('');

    const [output, setOutput] = useState(''); // The output of the users code
    const [error, setError] = useState(false); // Whether or not the was an error in the user's code

    const [showOutput, setShowOutput] = useState(true); // Whether or not the output box is shown

    const [help, setHelp] = useState(false); // Whether or not the help modal is up or not

    const fileExtensions = [
        {
            name: 'Text File',
            extension: '.txt'
        },
        {
            name: 'Javascript File',
            extension: '.js'
        },
    ];

    const getFileExtension = (string) => {
        return string.split('.')[1];
    }

    // This is ran when we create a new file handler, like opening a file or clicking 'save as'
    const processFileHandler = (handler) => {
        setFileHandler(handler);
        setFileName(handler.name);

        const extension = '.' + getFileExtension(handler.name);
        const fileTypeName = fileExtensions.find((object) => object.extension === extension).name;
        setFileExtension(extension);
        setFileType(fileTypeName);
    }

    const newFile = async () => {
        setFileHandler(null); // The file handler that we use to write to
        setFileName(null); // The name of the file we're currently working on

        setFileExtension('');
        setFileType('');

        setCode('');
    }

    const openFile = async () => {
        const options = {
            types: [
                {
                    description: 'Text Files',
                    accept: {
                        'text/plain': ['.txt'],
                    },
                },
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

        processFileHandler(files[0]);

        setCode(text);
    }

    const saveFile = async () => {
        // If there is a file handler (i.e we have already saved a file) we just update that file,
        // If not we make a new 'save as' prompt
        if (fileHandler) {
            // Save
            const writable = await fileHandler.createWritable(); // Create a new writable stream

            const blob = new Blob([code]);

            await writable.write(blob);

            await writable.close();
        }
        else {
            // Save as
            const handler = await window.showSaveFilePicker();
            const writable = await handler.createWritable();

            await writable.write(code);

            await writable.close();

            processFileHandler(handler);
        }
    }

    const downloadFile = () => {
        downloadAsFile({
            data: code,
            filename: `${chosenFileName}.js`
        })

        filenameInput.current.value = '';
    }

    const runCode = () => {
        if (code === '') {
            alert("Type something in the code editor before running your code!");

            return;
        }
        else if (fileExtension !== '.js') {
            alert(`Sorry, you can only run Javascript files! This is a ${fileType}`);

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

    const toggleOutputBox = () => {
        setShowOutput(!showOutput);
    }

    return (
        <div className="app">
            <header>
                <button className="header-button file-dropdown-button">
                    <p>File</p>
                    <div className="file-dropdown">
                        <button className="header-button file-dropdown-item" onClick={newFile}>New File</button>
                        <button className="header-button file-dropdown-item" onClick={openFile}>Open File</button>
                        <button className="header-button file-dropdown-item" onClick={saveFile}>Save{!fileHandler && ' As'} File</button>
                    </div>
                </button>

                <button className="header-button download-file-button">
                    <p>Download File</p>
                    <div className="enter-filename">
                        <p className="filename">Filename: </p>
                        <input type="text" onChange={(e) => setChosenFileName(e.target.value)} ref={filenameInput} />
                        <button className="header-button enter-filename-button" onClick={downloadFile}>Enter</button>
                    </div>
                </button>

                <button className="header-button" onClick={() => window.open('https://github.com/lordmaltazor/online-text-editor', '_blank')}>Github</button>
                <button className="header-button" onClick={() => setHelp(true)}>Help</button>
                <button className="header-button" onClick={runCode}>Run</button>
                <div className="header-spacer"></div>
                <button className="header-button" onClick={toggleOutputBox}>{showOutput ? 'Hide' : 'Show'}</button>
            </header>

            <section className="main-section">
                <Editor value={code} onChange={setCode} linting={fileHandler === null || fileExtension !== '.txt'} />

                {showOutput && <div className="output" style={{ color: error ? "red" : 'white' }}>
                    <p className="output-text">Output:</p>
                    {output}
                </div>}
            </section>

            <div className="status-bar">
                <p className="current-file">{fileName} {fileName && '|'} {fileType}</p>
            </div>

            {help && <div className="help-modal-background" onClick={() => setHelp(false)}>
                <div className="help-modal">
                    <p className="help-modal-title">Help</p>
                    <button className="close-help-modal" onClick={() => setHelp(false)}><i className="fas fa-times"></i></button>
                    <p className="help">Just type your Javascript in the editor, and you will see the output in the panel to the right. When you're done with the code, you can choose a file name and download the script if you want to.</p>
                </div>
            </div>}
        </div>
    );
}

export default App;
