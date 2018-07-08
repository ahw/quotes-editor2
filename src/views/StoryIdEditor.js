import React, { Component } from 'react';
import { getUrl } from '../utils/url';

export default class StoryIdEditor extends Component {
    
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
                }, null, getUrl({ id: storyId }));
            }
        }

        this.props.updateStoryId(storyId);
    }

    render() {
        const href = getUrl({ id: this.props.storyId });
        return (
            <a className="StoryIdEditor" href={href}>{href}</a>
        );
    }
}