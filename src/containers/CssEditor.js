import { connect } from 'react-redux';
import CssEditor from '../views/CssEditor';
import {
    addCssSelector,
    updateCssSelector,
    removeCssSelector,
    addCssDeclaration,
    updateCssDeclaration,
    removeCssDeclaration,
} from '../actions';

function mapStateToProps(state, ownProps) {
    return {
        cssRules: state.cssRules,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        // addCssDeclaration: (selector, index, property, value) => dispatch(addCssDeclaration(selector, index, property, value))

        addCssSelector: (...args) => dispatch(addCssSelector(...args)),
        updateCssSelector: (...args) => dispatch(updateCssSelector(...args)),
        removeCssSelector: (...args) => dispatch(removeCssSelector(...args)),
        addCssDeclaration: (...args) => dispatch(addCssDeclaration(...args)),
        updateCssDeclaration: (...args) => dispatch(updateCssDeclaration(...args)),
        removeCssDeclaration: (...args) => dispatch(removeCssDeclaration(...args)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CssEditor);