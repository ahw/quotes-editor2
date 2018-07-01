import { connect } from 'react-redux';
import App from '../views/App';
import { updateUser } from '../actions';

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateUser: user => dispatch(updateUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);