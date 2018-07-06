import { connect } from 'react-redux';
import StoryCanvas from '../views/StoryCanvas';

function mapStateToProps(state, ownProps) {
    return {
        storyText: state.storyText,
    };
}

export default connect(mapStateToProps)(StoryCanvas);