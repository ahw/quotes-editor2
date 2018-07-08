import { connect } from 'react-redux';
import CssEditor from '../views/CssEditor';
import {
    updateCssText,
} from '../actions';

function mapStateToProps(state, ownProps) {
    return {
        cssText: state.cssText === null ? "" : state.cssText,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateCssText: cssText => dispatch(updateCssText(cssText)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CssEditor);