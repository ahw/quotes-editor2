import { connect } from 'react-redux';
import { updateStoryText } from '../actions';
import StoryEditor from '../views/StoryEditor';


function mapStateToProps(state, ownProps) {
    return {
        storyText: state.storyText === null ? "" : state.storyText,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateStoryText: storyText => dispatch(updateStoryText(storyText))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditor);