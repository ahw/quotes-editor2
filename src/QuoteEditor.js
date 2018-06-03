import React from 'react';

export default function QuoteEditor(props) {
    return (
        <div id="quote-editor-container" className={props.editorHasFocus ? "is-focused" : "not-focused"}>
            <textarea id="main-quote-editor" value={props.rawText} onChange={props.onChange} onFocus={() => props.onFocus()}/>
            <div id="quote-editor-close" onClick={() => props.onCloseButtonClick()}><span>Close</span></div>
        </div>
    );
}

