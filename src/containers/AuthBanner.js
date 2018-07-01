import { connect } from 'react-redux';
import AuthBanner from '../views/AuthBanner';

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(AuthBanner);
