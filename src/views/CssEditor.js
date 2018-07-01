import React from 'react';
import EditableInput from './EditableInput';

export default function CssEditor(props) {
    const cssRules = props.cssRules.map((rule, ruleIndex) => {
        return (
            <div key={ruleIndex}>
                <EditableInput
                    className="css-selector"
                    value={rule.selector}
                    onChange={selector => props.updateCssSelector(selector, ruleIndex)}
                >
                </EditableInput>
                <div
                    className="add-declaration-to-selector"
                    onClick={() => props.addCssDeclaration(rule.selector, ruleIndex, 'display', 'block')}
                >
                    +
                </div>
                {Object.keys(rule.declarations).map((property, declarationIndex) => {
                    const value = rule.declarations[property];

                    return (
                        <div
                            key={declarationIndex}
                            className="css-declaration-container"
                        >
                            <EditableInput
                                value={property}
                                onChange={newProperty => props.updateCssDeclaration(rule.selector, ruleIndex, newProperty, value, property)}
                            />
                            <EditableInput
                                value={value}
                                onChange={newValue => props.updateCssDeclaration(rule.selector, ruleIndex, property, newValue)}
                            />
                        </div>
                    );
                })}
            </div>
        );
    });
    
    return (
        <div className="CssEditor">
            {cssRules}
            <div
                onClick={() => props.addCssSelector('.something.' + Math.random().toString().substr(2, 7))}
            >
                Add selector
            </div>
        </div>
    );
            
}