import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as ControlledEditor } from 'react-codemirror2';

export default function Editor({ value, onChange, language }) {
    const handleChange = (editor, data, value) => {
        onChange(value);
    }

    return (
        <div className="editor-container">
            <ControlledEditor
                className="editor"
                value={value}
                onBeforeChange={handleChange}
                options={{
                    mode: language === 'text' ? null : language,
                    theme: 'material',
                    fontSize: 20,
                    lint: true,
                    lineNumbers: language !== 'text',
                    lineWrapping: true
                }}
            />
        </div>
    )
}
