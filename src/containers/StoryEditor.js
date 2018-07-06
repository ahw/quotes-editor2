import { connect } from 'react-redux';
import { updateStoryText } from '../actions';
import StoryEditor from '../views/StoryEditor';


function mapStateToProps(state, ownProps) {
    return {
        quotes: state.quoteText,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateStoryText: quoteText => dispatch(updateStoryText(quoteText))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditor);