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


exports.pickDefinedFn = function (ks, r) {
    var copy = {};
    for (var i = 0; i < ks.length; i++) {
        if (r[ks[i]] !== undefined) {
            copy[ks[i]] = r[ks[i]];
        }
    }
    return copy;
};

exports.createRef = React.createRef
