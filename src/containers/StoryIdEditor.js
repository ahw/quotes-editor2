import { connect } from 'react-redux';
import {
    updateStoryId,
    updateStoryUserId,
} from '../actions';
import StoryIdEditor from '../views/StoryIdEditor';

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        storyId: state.storyId,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateStoryId: storyId => {
            // TODO: pass unlink binding function
            return dispatch(updateStoryId(storyId));
        },
        updateStoryUserId: storyUserId => dispatch(updateStoryUserId(storyUserId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryIdEditor);
