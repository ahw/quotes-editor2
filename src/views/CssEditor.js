import React from 'react';

const TAB_REPLACEMENT = '  ';

export default function CssEditor(props) {
    return (
        <div className="CssEditor TextEditor">
            <textarea
                value={props.cssText}
                onChange={e => props.updateCssText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.keyCode === 9) {
                        e.preventDefault();
                        const { selectionStart, selectionEnd } = e.target;
                        const cssText = e.target.value.substring(0, selectionStart) + TAB_REPLACEMENT + e.target.value.substring(selectionEnd);
                        props.updateCssText(cssText);
                        const nativeEvent = e.nativeEvent;
                        setTimeout(() => {
                            nativeEvent.target.selectionStart = selectionStart + TAB_REPLACEMENT.length;
                            nativeEvent.target.selectionEnd = selectionStart + TAB_REPLACEMENT.length;
                        }, 0);
                    }

                }}
            />
        </div>
    );
}