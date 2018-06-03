import React from 'react';
import './App.css';
import QuoteEditor from './QuoteEditor';
import LayoutEditor from './LayoutEditor';
import QuoteContainer from './QuoteContainer';
import { isValidLine, parseLine, clean } from './utils';

const defaultRawText = `She's nice. She's normal. - 8th Ave and W 41st St
Have you met her yet? - Bryant Park
No. Well—no. - 6th Ave and W 40th St
She's psycho. - Bryant Park`;

const extraCss = `
#all-quotes-container {
}

#background-image-container {
    transform: rotate(0deg) scale(1);
    background-size: cover;
}

.quote-container {
}

.overlay {
}

.quote-text {
}

.source-text {
}`;

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            editorHasFocus: false,
            layoutStyles: {
                paddingRightLeft: 30,
                paddingTopBottom: 40,

                canvasPaddingTop: 0,
                canvasPaddingRight: 0,
                canvasPaddingBottom: 0,
                canvasPaddingLeft: 0,

                backgroundColor: '#000000',
                backgroundImage: '',
                backgroundTop: 0,
                backgroundRight: 0,
                backgroundBottom: 0,
                backgroundLeft: 0,
                backgroundTransform: 'none',

                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                color: '#000000', // '#ffffff',
                opacity: 0.5,
                overlayColor: '#FF3CA7',
                marginBottom: 10,
                inlineSpacing: 6,
                margin: 0,
                quoteAndSourcePadding: 5,
                sourceTopMargin: 0,
                borderRadius: 0,
                inline: true, // false,
                lineHeight: 'normal',
                center: true,
                invertedColors: false,
            },
            hideSource: true, // false,
            showOverlay: false,
            hash: {
                rawText: defaultRawText,
                extraCss,
            },
        };
    }

    updateHash(hash) {
        const newHash = Object.assign({}, this.state.hash, hash);
        const str = Object.keys(newHash).map(key => {
            const value = newHash[key];
            return `${key}=${encodeURIComponent(value)}`;
        }).join('&');

        window.location.hash = str;
        this.setState({ hash: newHash });
    }

    componentDidMount() {
        const hash = {};
        const hashStr = window.location.hash
        const pairs = hashStr.replace(/^#/, '').split('&');
        pairs.filter(pair => pair).forEach(pair => {
            const [key, value] = pair.split('=');
            hash[key] = decodeURIComponent(value);
        });

        const newHash = Object.assign({}, this.state.hash, hash);
        this.setState({ hash: newHash })
    }

    getCleanedRawText(text) {
        return text
    }

    handleRawTextChange(e) {
        let rawText = this.getCleanedRawText(e.target.value)
        const hash = Object.assign({}, { rawText });
        this.updateHash(hash);
    }

    getRawTextFromQuotes(quotes) {
        return quotes.map(item => item.quote + ' - ' + item.source).join('\n\n')
    }

    // setExtraCss(extraCss) {
    //     let style = document.getElementById('extraCssStyle');
    //     if (!style) {
    //         style = document.createElement('style');
    //         style.id = 'extraCssStyle';
    //         document.head.appendChild(style);
    //     }
    //     this.updateHash({ extraCss });
    //     style.innerHTML = extraCss;
    // }

    handleCssChange(e) {
        const extraCss = e.target.value;
        this.updateHash({ extraCss });
    }

    handleOverlayToggle() {
        this.setState({ showOverlay: !this.state.showOverlay });
    }

    handleHideSource() {
        this.setState({ hideSource: !this.state.hideSource });
    }

    handleFileSelect(evt) {
        const files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (let i = 0, f; f = files[i]; i++) {
        // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            const reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (theFile => {
              return e => {
                const layoutStyles = Object.assign({}, this.state.layoutStyles, {
                    // backgroundImage: `url('${e.target.result}')`
                    backgroundImage: e.target.result,
                });
                this.setState({ layoutStyles });
              };
            })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
      }
    }

    handleLayoutChange(property, e) {
        if (e.type === 'click' && this.state.hasTouch) {
            // Ignore
            return
        }

        if (e.target) {
            e.preventDefault();
        }

        let value = e;
        if (e.target && typeof e.target.value !== 'undefined') {
            value = e.target.value
        }

        if (/^[\d.]+$/.test(value)) {
            value = parseFloat(value);
        }

        const layoutStyles = Object.assign({}, this.state.layoutStyles, { [property]: value });

        this.setState({
            hasTouch: e.type === 'touchstart' || this.state.hasTouch,
            layoutStyles,
        })
    }

    getQuotes(rawText) {
        return rawText.split('\n')
            .filter(isValidLine)
            .map(parseLine)
            .map(clean);
    }

    render() {
        let quotes = this.getQuotes(this.state.hash.rawText)
        let squareOverlayStyle = {
            background: 'red',
            opacity: 0.2,
            zIndex: 100,
            width: '100vw',
            height: '100vw',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };

        setTimeout(() => window.smartquotes && window.smartquotes(), 200)

        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: this.state.hash.extraCss}} />
                {this.state.showOverlay ? <div onClick={this.handleOverlayToggle.bind(this)} style={squareOverlayStyle}/> : null}
                <QuoteEditor
                    rawText={this.state.hash.rawText}
                    editorHasFocus={this.state.editorHasFocus}
                    onFocus={() => this.setState({ editorHasFocus: true })}
                    onCloseButtonClick={() => this.setState({ editorHasFocus: false })}
                    onChange={this.handleRawTextChange.bind(this)}/>
                <LayoutEditor
                    layoutStyles={this.state.layoutStyles}
                    onLayoutChange={this.handleLayoutChange.bind(this)}
                    onOverlayToggle={this.handleOverlayToggle.bind(this)}
                    onHideSource={this.handleHideSource.bind(this)}
                    onFileSelect={this.handleFileSelect.bind(this)}
                    extraCss={this.state.hash.extraCss}
                    showOverlay={this.state.showOverlay}
                    hideSource={this.state.hideSource}
                    onCssChange={this.handleCssChange.bind(this)}/>
                <QuoteContainer
                    layoutStyles={this.state.layoutStyles}
                    hideSource={this.state.hideSource}
                    quotes={quotes}/>
            </div>
        );
    }
}

export default App;
