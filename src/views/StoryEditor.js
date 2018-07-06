import React from 'react';

export default function StoryEditor(props) {
    return (
        <div className="StoryEditor TextEditor">
            <textarea
                value={props.storyText}
                onChange={e => props.updateStoryText(e.target.value)}
            />
        </div>
    );
}