import React from 'react';
// import QuoteAndSourceInline from './QuoteAndSourceInline';
import QuoteAndSource from './QuoteAndSource';

export default function QuoteContainer(props) {
    let style = {
        backgroundColor: props.layoutStyles.invertedColors ? props.layoutStyles.color : props.layoutStyles.backgroundColor,
        color: props.layoutStyles.invertedColors ? props.layoutStyles.backgroundColor : props.layoutStyles.color,
        // backgroundImage: props.layoutStyles.backgroundImage,
        backgroundRepeat: props.layoutStyles.backgroundRepeat,
        backgroundPosition: props.layoutStyles.backgroundPosition,
        backgroundSize: props.layoutStyles.backgroundSize,

        paddingTop: props.layoutStyles.canvasPaddingTop,
        paddingRight: props.layoutStyles.canvasPaddingRight,
        paddingBottom: props.layoutStyles.canvasPaddingBottom,
        paddingLeft: props.layoutStyles.canvasPaddingLeft,

        width: '100vw',
        display: props.layoutStyles.inline ? 'block' : 'flex',
        alignItems: props.layoutStyles.inline ? 'center' : 'stretch',
        alignContent: props.layoutStyles.inline ? 'center' : 'stretch',
        flexDirection: props.layoutStyles.inline ? 'row' : 'column',
        justifyContent: 'center', // props.layoutStyles.inline ? 'flex-start' : 'center',
        textAlign: props.layoutStyles.inline ? 'center' : 'left',
        minHeight: '100vh', // props.layoutStyles.inline ? 'auto' : '100vh',
        flexWrap: props.layoutStyles.inline ? 'wrap' : 'nowrap',
        boxSizing: 'border-box',
        lineHeight: props.layoutStyles.lineHeight,
        position: 'relative',
    }


    let children = props.quotes.map(item => {
        return (
            <QuoteAndSource
                    key={item.quote + item.source}
                    marginBottom={props.layoutStyles.marginBottom}
                    inlineSpacing={props.layoutStyles.inlineSpacing}
                    padding={props.layoutStyles.quoteAndSourcePadding}
                    sourceTopMargin={props.layoutStyles.sourceTopMargin}
                    borderRadius={props.layoutStyles.borderRadius}
                    backgroundColor={props.layoutStyles.backgroundColor}
                    overlayColor={props.layoutStyles.overlayColor}
                    opacity={props.layoutStyles.opacity}
                    color={props.layoutStyles.color}
                    invertedColors={props.layoutStyles.invertedColors}
                    hideSource={props.hideSource}
                    inline={props.layoutStyles.inline}
                    quote={item.quote}
                    source={item.source} />
        );
    });

    /*
     *
     <div style={style} id="all-quotes-container">
         <div id="background-image-container"
             style={{
                 backgroundImage: props.layoutStyles.backgroundImage,
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 width: '100%',
                 height: '100%',
             }}
         />
     </div>
     */

    const backgroundImageStyle = {
        backgroundImage: props.layoutStyles.backgroundImage ? `url('${props.layoutStyles.backgroundImage}')` : 'none',
        backgroundRepeat: props.layoutStyles.backgroundRepeat,
        backgroundSize: props.layoutStyles.backgroundSize,
        backgroundPosition: props.layoutStyles.backgroundPosition,
        top: props.layoutStyles.backgroundTop,
        right: props.layoutStyles.backgroundRight,
        bottom: props.layoutStyles.backgroundBottom,
        left: props.layoutStyles.backgroundLeft,
        transform: props.layoutStyles.backgroundTransform,
    };

    const canvasStyle = {
        flexDirection: props.layoutStyles.inline ? 'row' : 'column',
    };

    return (
        <div id="canvas" style={canvasStyle}>
            <div
                id="background-image"
                style={backgroundImageStyle}
            />
            <div
                id="entries"
                style={{
                    paddingTop: props.layoutStyles.canvasPaddingTop,
                    paddingRight: props.layoutStyles.canvasPaddingRight,
                    paddingBottom: props.layoutStyles.canvasPaddingBottom,
                    paddingLeft: props.layoutStyles.canvasPaddingLeft,
                }}
            >
                {children}
            </div>
        </div>
    );
}

