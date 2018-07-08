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
        updateStoryId: storyId => {
            // TODO: pass unlink binding function
            ownProps.setupFirebaseStoreBindings(storyId);
            return dispatch(updateStoryId(storyId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryIdEditor);