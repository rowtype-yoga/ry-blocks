const React = require("react")

exports.mkForwardRefComponent = (displayName) => (renderFn) => {
    const component = (props, ref) => renderFn(props)(ref)();
    component.displayName = displayName;
    return React.forwardRef(component);
};

