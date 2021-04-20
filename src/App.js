import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Tab from './comps/Tab';
import Editor from './comps/Editor';
import fileTypes from './FileTypes';
import openFileOptions from './OpenFileOptions';
import defaultPreview from './DefaultPreview';
import CloseButton from './comps/CloseButton';

function App() {
    const iframe = useRef(null);

    const [output, setOutput] = useState(''); // The output of the users code
    const [error, setError] = useState(false); // Whether or not the was an error in the user's code

    const [showConsole, setShowConsole] = useState(false); // Whether or not the output box is shown
    const [showWebsitePreview, setShowWebsitePreview] = useState(false); // Whether or not the website preview is shown

    const [help, setHelp] = useState(false); // Whether or not the help modal is up or not

    const [settingsMenu, setSettingsMenu] = useState(false);

    // Settings
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 22);
    const [editorTheme, setEditorTheme] = useState(localStorage.getItem('editorTheme') || 'material');

    const root = document.querySelector(':root');
    root.style.setProperty('--editor-font-size', `${fontSize}px`);

    console.log(editorTheme);

    class TabClass {
        constructor(code, fileHandler, fileName, fileExtension, fileType, language, modified) {
            this.code = code;
            this.fileHandler = fileHandler;
            this.fileName = fileName;
            this.fileExtension = fileExtension;
            this.fileType = fileType;
            this.language = language;
            this.modified = modified;
        }
    }

    const [tabs, setTabs] = useState([new TabClass('', null, 'untitled', '', '', 'text')]);
    const [currentTab, setCurrentTab] = useState(0); // The index of the tab the user is currently on

    const html = tabs.find(tab => tab.fileExtension === '.html')?.code;
    const css = tabs.find(tab => tab.fileExtension === '.css')?.code;
    const javascript = tabs.find(tab => tab.fileExtension === '.js')?.code;

    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('editorTheme', editorTheme);
    }, [fontSize, editorTheme])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (html !== undefined) {
                setSrcDoc(`
                    <html>
                        <body>${html || ''}</body>
                        <style>${css || ''}</style>
                        <script>${javascript || ''}</script>
                    </html>
                `);
            }
            else {
                setSrcDoc(defaultPreview);
            }
        }, 250)

        return () => clearTimeout(timeout);
    }, [html, css, javascript])

    const updateCode = (value) => {
        const arr = tabs;

        arr[currentTab].code = value;
        arr[currentTab].modified = true;

        setTabs([...arr]);
    }

    // This is ran when we create a new file handler, like opening a file or clicking 'save as'
    const getNewTab = (code, handler) => {
        const extension = '.' + handler.name.split('.')[1];

        const fileType = fileTypes.find((object) => object.extension === extension);
        const fileTypeName = fileType.name;
        const fileLanguage = fileType.language;

        if (extension === '.html') {
            setShowWebsitePreview(true);
        }

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
        const files = await window.showOpenFilePicker(openFileOptions);
        const file = await files[0].getFile();
        const text = await file.text();

        setTabs([...tabs, getNewTab(text, files[0])]);

        setCurrentTab(tabs.length);
    }

    const saveFile = async () => {
        const arr = tabs;

        arr[currentTab].modified = false;

        setTabs([...arr]);

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

            arr[currentTab] = getNewTab(tabs[currentTab].code, handler);

            setTabs([...arr]);
        }
    }

    const runCode = () => {
        if (tabs[currentTab].fileExtension !== '.js') {
            alert(`Sorry, you can only run Javascript files! This is a ${tabs[currentTab].fileType || 'Text file'}`);

            return;
        }
        else if (tabs[currentTab].code === '') {
            alert("Type something in the code editor before running your code!");

            return;
        }

        setShowConsole(true);

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

    return (
        <div className="app">
            <header>
                <button className="button header-button file-dropdown-button">
                    <p>File</p>
                    <div className="file-dropdown">
                        <button className="button header-button file-dropdown-item" onClick={newFile}>New File</button>
                        <button className="button header-button file-dropdown-item" onClick={openFile}>Open File</button>
                        <button className="button header-button file-dropdown-item" onClick={saveFile}>Save{!tabs[currentTab].fileHandler && ' As'}</button>
                    </div>
                </button>

                <button className="button header-button" onClick={() => window.open('https://github.com/lordmaltazor/online-text-editor', '_blank')}>Github</button>
                <button className="button header-button" onClick={() => setHelp(true)}>Help</button>
                <button className="button header-button" onClick={() => setSettingsMenu(true)}>Settings</button>
                <button className="button header-button" onClick={runCode}>Run</button>
                <div className="header-spacer"></div>
                <button className="button header-button" onClick={() => setShowConsole(!showConsole)}>{showConsole ? 'Hide' : 'Show'} console</button>
            </header>

            <div className="tabs">
                {tabs.map((tab, index) => <Tab key={index} name={tab.fileName} onClick={() => tabs[index] && setCurrentTab(index)} close={() => closeTab(index)} isCurrent={currentTab === index} isLast={tabs.length > 1} modified={tab.modified} />)}
            </div>

            <section className="main-section">
                <div className="horizontal-main-section">
                    <Editor value={tabs[currentTab].code} onChange={(value) => updateCode(value)} language={tabs[currentTab].language} theme={editorTheme} />

                    {showConsole && <div className="console" style={{ color: error ? "red" : 'white' }}>
                        <p className="console-text">Output:</p>
                        {output}
                    </div>}
                </div>

                {showWebsitePreview && <div className="website-preview">
                    <iframe
                        title="output"
                        srcDoc={srcDoc}
                        ref={iframe}
                        sandbox="allow-scripts"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    />
                </div>}
            </section>

            <div className="status-bar">
                <p className="current-file">{tabs[currentTab].fileName} {tabs[currentTab].fileName && '|'} {tabs[currentTab].fileType || 'Text file'}</p>
                <div className="status-bar-spacer"></div>
                <button className="button toggle-iframe-button" onClick={() => iframe.current.requestFullscreen()}>Go fullscreen</button>
                <button className="button toggle-iframe-button" onClick={() => setShowWebsitePreview(!showWebsitePreview)}>{showWebsitePreview ? 'Hide preview' : 'Show preview'}</button>
            </div>

            {help && <div className="black-overlay">
                <div className="help-modal">
                    <p className="help-modal-title">Help</p>
                    <CloseButton onClick={() => setHelp(false)} />

                    <p className="help">Just type your Javascript in the editor, and you will see the output in the panel to the right. When you're done with the code, you can choose a file name and download the script if you want to.</p>
                </div>
            </div>}

            {settingsMenu && <div className="black-overlay">
                <div className="settings-menu">
                    <p className="settings-menu-title">Settings</p>
                    <CloseButton onClick={() => setSettingsMenu(false)} />

                    <p className="setting-text">Text size: {fontSize}</p>
                    <input className="slider" value={fontSize} onInput={(e) => setFontSize(e.target.value)} type="range" min="15" max="50" />

                    <p className="setting-text">Editor theme: {editorTheme === 'material' ? 'Dark' : 'Light'}</p>
                    <div className="select-container">
                        <select value={editorTheme} onChange={(e) => setEditorTheme(e.target.value)}>
                            <option value="material">Dark theme</option>
                            <option value="default">Light theme</option>
                        </select>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>}
        </div >
    );
}

export default App;
