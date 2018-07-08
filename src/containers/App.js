import { connect } from 'react-redux';
import App from '../views/App';
import { updateUser, updateMode } from '../actions';

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        mode: state.mode,
        storyId: state.storyId,
        storyUserId: state.storyUserId,
        receivedDataOnce: state.receivedDataOnce,
        newStory: ownProps.newStory,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateUser: user => dispatch(updateUser(user)),
        updateMode: mode => dispatch(updateMode(mode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);