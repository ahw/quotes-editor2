import React, { Component } from 'react';
import { getUrl, pushUrlOntoHistory } from '../utils/url';

export default class StoryIdEditor extends Component {
    
    componentDidMount() {
        const matches = window.location.search.match(/id=(\w+)/);
        let storyId;
        if (matches && matches[1]) {
            // If there was already a story id in the URL, we don't need to
            // do any kind of URL navigation, we just need to update the
            // story id in the app state.
            storyId = matches[1];
        } else {
            // If there was no story id in the URL, we should create one
            // automatically and navigate the URL to this story id so the
            // user has a bookmarkable URL from the get-go.
            storyId = Math.random().toString(31).substr(2, 8);
        }

        this.updateStoryId({ storyId, storyUserId: this.props.user.uid });
        this.props.linkToFirebase(storyId);
    }

    updateStoryId({ storyId, storyUserId }) {
        this.props.updateStoryId(storyId);
        this.props.updateStoryUserId(storyUserId);
    }

    render() {
        const href = getUrl({ id: this.props.storyId }, { merge: false });
        if (this.props.storyId) {
            return (
                <div className="StoryIdEditor">
                    <input
                        value={this.props.storyId}
                        onChange={e => this.updateStoryId({ storyId: e.target.value, storyUserId: this.props.user.uid })}
                    />
                    <a href={href}>{href}</a>
                </div>
            );
        } else {
            return (<div>no story id found!</div>);
        }
    }
}
