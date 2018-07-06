import { connect } from 'react-redux';
import { updateStoryId } from '../actions';
import StoryIdEditor from '../views/StoryIdEditor';

function mapStateToProps(state, ownProps) {
    return {
        storyId: state.storyId,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateStoryId: storyId => dispatch(updateStoryId(storyId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryIdEditor);