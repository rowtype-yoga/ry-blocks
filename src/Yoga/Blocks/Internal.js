const React = require("react")

exports.mkForwardRefComponent = (displayName) => (renderFn) => {
    const component = (props, ref) => renderFn(props)(ref)();
    component.displayName = displayName;
    return React.forwardRef(component);
};


exports.mkForwardRefComponentEffect = (displayName) => (renderFn) => () => {
    const component = (props, ref) => renderFn(props)(ref)();
    component.displayName = displayName;
    return React.forwardRef(component);
};

exports.pickDefinedFn = function (ks, obj) {
    const copy = {};
    for (let i = 0; i < ks.length; i++) {
        if (obj[ks[i]] !== undefined) {
            copy[ks[i]] = obj[ks[i]];
        }
    }
    return copy;
};

exports.createRef = React.createRef
