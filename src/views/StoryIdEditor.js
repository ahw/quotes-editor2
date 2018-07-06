import React, { Component } from 'react';

function getUrl(storyId) {
    return `?id=${storyId}`;
}

export default class StoryIdEditor extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        const matches = window.location.search.match(/id=(\w+)/);
        let storyId;
        if (matches && matches[1]) {
            storyId = matches[1];
        } else {
            storyId = Math.random().toString(31).substr(2, 8);
            if (window.history && window.history.pushState) {
                window.history.pushState({
                    storyId,
                }, null, getUrl(storyId));
            }
        }

        this.props.updateStoryId(storyId);
    }

    render() {
        const href = getUrl(this.props.storyId);
        return (
            <a className="StoryIdEditor" href={href}>{href}</a>
        );
    }
}