import React from 'react';

export default function QuoteAndSource(props) {

    console.log(props.borderRadius);

    const display = props.inline ? 'inline-block' : 'block';
    const quoteContainerStyle = {
        marginBottom: props.inline ? 0 : props.marginBottom,
        // padding: Math.floor(props.padding / 2),
        padding: props.padding,
        paddingTop: props.padding,
        paddingBottom: props.padding,
        WebkitBoxDecorationBreak: 'clone',
        boxDecorationBreak: 'clone',
        display,
        background: /*props.inline ? overlayColor :*/ 'transparent',
        color: props.color,
    };

    const sourceStyle = Object.assign({ marginTop: props.sourceTopMargin }, { display });
    const overlayStyle = {
        backgroundColor: props.overlayColor,
        opacity: props.opacity,
    };

    const words = props.quote.split(/\s+/);
    const maxRotation = 4;
    return (
        <React.Fragment>
            {
                words.map((part, i) => (
                    <div
                        style={{
                            ...quoteContainerStyle,
                            // paddingLeft: i === 0 ? props.padding : Math.floor(props.padding / 2),
                            // paddingRight: i === words.length - 1 ? props.padding : Math.floor(props.padding / 2),
                            marginRight: i === words.length - 1 ? props.inlineSpacing : props.inlineSpacing / 2,
                            marginBottom: props.inlineSpacing / 2,
                            transform: `rotate(${maxRotation - Math.random() * maxRotation * 2}deg)`,
                        }}
                        className="quote-container"
                        key={part + i}
                    >
                        <div style={overlayStyle} className="overlay" />
                        <div className="quote-container-inner">
                            <span style={{ display }} className="quote-text">
                                {
                                    i === 0
                                    ? <span dangerouslySetInnerHTML={{__html: '&ldquo;'}}/>
                                    : null
                                }
                                {part}
                                {
                                    i === words.length - 1
                                    ? <span dangerouslySetInnerHTML={{__html: '&rdquo;'}}/>
                                    : null
                                }
                            </span>
                            {
                                !props.hideSource
                                ? <span style={sourceStyle} className="source-text">{props.source}</span>
                                : null
                            }
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    );
}
