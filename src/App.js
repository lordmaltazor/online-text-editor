import React, { useState, useEffect } from 'react';
import './App.css';
import Tab from './Tab';
import Editor from './Editor';

function App() {
    const [output, setOutput] = useState(''); // The output of the users code
    const [error, setError] = useState(false); // Whether or not the was an error in the user's code

    const [showOutput, setShowOutput] = useState(true); // Whether or not the output box is shown
    const [showWebsiteOutput, setShowWebsiteOutput] = useState(true); // Whether or not the iframe is shown

    const [help, setHelp] = useState(false); // Whether or not the help modal is up or not

    class TabClass {
        constructor(code, fileHandler, fileName, fileExtension, fileType, language) {
            this.code = code;
            this.fileHandler = fileHandler;
            this.fileName = fileName;
            this.fileExtension = fileExtension;
            this.fileType = fileType;
            this.language = language;
        }
    }

    const [tabs, setTabs] = useState([new TabClass('', null, 'untitled', '', '', 'text')]);
    const [currentTab, setCurrentTab] = useState(0); // The index of the tab the user is currently on

    const html = tabs.find(tab => tab.fileExtension === '.html')?.code;
    const css = tabs.find(tab => tab.fileExtension === '.css')?.code;
    const javascript = tabs.find(tab => tab.fileExtension === '.js')?.code;

    const [srcDoc, setSrcDoc] = useState('');

    console.log(html);
    //console.log(srcDoc);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (html !== undefined) {
                setSrcDoc(`
                    <html>
                        <body>${html ? html : ''}</body>
                        <style>${css ? css : ''}</style>
                        <script>${javascript ? javascript : ''}</script>
                    </html>
                `);
            }
            else {
                setSrcDoc(`
                <html>
                    <body><p>You have to have a HTML file open for this to work!</p></body>
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
                        font-size: 30px;
                        font-family: sans-serif;
                    }
                    </style>
                </html>
            `);
            }
        }, 250)

        return () => clearTimeout(timeout);
    }, [html, css, javascript])

    const fileExtensions = [
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

    const updateCode = (value) => {
        const arr = tabs;

        arr[currentTab].code = value;

        setTabs([...arr]);
    }

    const getFileExtension = (string) => {
        return string.split('.')[1];
    }

    // This is ran when we create a new file handler, like opening a file or clicking 'save as'
    const createNewTab = (code, handler) => {
        const extension = '.' + getFileExtension(handler.name);

        const correctFileExtension = fileExtensions.find((object) => object.extension === extension);
        const fileTypeName = correctFileExtension.name;
        const fileLanguage = correctFileExtension.language;

        return (new TabClass(code, handler, handler.name, extension, fileTypeName, fileLanguage));
    }

    const closeTab = (index) => {
        const arr = tabs;

        arr.splice(index, 1);

        setCurrentTab(0);

        setTabs([...arr]);
    }

    const newFile = async () => {
        setTabs([...tabs, new TabClass('', null, 'untitled', '', '', 'text')]);

        setCurrentTab(tabs.length);
    }

    const openFile = async () => {
        const options = {
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
            ],
        };

        const files = await window.showOpenFilePicker(options);
        const file = await files[0].getFile();
        const text = await file.text();

        setTabs([...tabs, createNewTab(text, files[0])]);

        setCurrentTab(tabs.length);
    }

    const saveFile = async () => {
        // If there is a file handler (i.e we have already saved a file) we just update that file,
        // If not we make a new 'save as' prompt
        if (tabs[currentTab].fileHandler) {
            // Save
            const writable = await tabs[currentTab].fileHandler.createWritable(); // Create a new writable stream

            const blob = new Blob([tabs[currentTab].code]);

            await writable.write(blob);

            await writable.close();
        }
        else {
            // Save as
            const handler = await window.showSaveFilePicker();
            const writable = await handler.createWritable();

            await writable.write(tabs[currentTab].code);

            await writable.close();

            const arr = tabs;

            arr[currentTab] = createNewTab(tabs[currentTab].code, handler);

            setTabs([...arr]);
        }
    }

    const runCode = () => {
        if (tabs[currentTab].code === '') {
            alert("Type something in the code editor before running your code!");

            return;
        }
        else if (tabs[currentTab].fileExtension !== '.js') {
            alert(`Sorry, you can only run Javascript files! This is a ${tabs[currentTab].fileType}`);

            return;
        }

        setShowOutput(true);

        try {
            setOutput(eval(tabs[currentTab].code));
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
                <button className="button header-button file-dropdown-button">
                    <p>File</p>
                    <div className="file-dropdown">
                        <button className="button header-button file-dropdown-item" onClick={newFile}>New File</button>
                        <button className="button header-button file-dropdown-item" onClick={openFile}>Open File</button>
                        <button className="button header-button file-dropdown-item" onClick={saveFile}>Save{!tabs[currentTab].fileHandler && ' As'} File</button>
                    </div>
                </button>

                <button className="button header-button" onClick={() => window.open('https://github.com/lordmaltazor/online-text-editor', '_blank')}>Github</button>
                <button className="button header-button" onClick={() => setHelp(true)}>Help</button>
                <button className="button header-button" onClick={runCode}>Run</button>
                <div className="header-spacer"></div>
                <button className="button header-button" onClick={toggleOutputBox}>{showOutput ? 'Hide' : 'Show'} output</button>
            </header>

            <div className="tabs">
                {tabs.map((tab, index) => <Tab key={index} name={tab.fileName} onClick={() => tabs[index] && setCurrentTab(index)} close={() => closeTab(index)} isCurrent={currentTab === index} isLast={tabs.length > 1} />)}
            </div>

            <section className="main-section">
                <div className="horizontal-main-section">
                    <Editor value={tabs[currentTab].code} onChange={(value) => updateCode(value)} language={tabs[currentTab].language} />

                    {showOutput && <div className="output" style={{ color: error ? "red" : 'white' }}>
                        <p className="output-text">Output:</p>
                        {output}
                    </div>}
                </div>

                {showWebsiteOutput && <div className="website-output">
                    <iframe
                        title="output"
                        srcDoc={srcDoc}
                        sandbox="allow-scripts"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    />
                </div>}
            </section>

            <div className="status-bar">
                <p className="current-file">{tabs[currentTab].fileName} {tabs[currentTab].fileName && tabs[currentTab].fileType && '|'} {tabs[currentTab].fileType}</p>
                <div className="status-bar-spacer"></div>
                <button className="button toggle-iframe-button" onClick={() => setShowWebsiteOutput(!showWebsiteOutput)}>{showWebsiteOutput ? 'Hide preview' : 'Show preview'}</button>
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
