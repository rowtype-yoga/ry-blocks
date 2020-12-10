const React = require("react")

exports.mkForwardRefComponent = (displayName) => (renderFn) => {
    const component = (props, ref) => renderFn(props)(ref)();
    component.displayName = displayName;
    component.whyDidYouRender = true;
    return React.forwardRef(component);
};


exports.mkForwardRefComponentEffect = (displayName) => (renderFn) => () => {
    const component = (props, ref) => renderFn(props)(ref)();
    component.displayName = displayName;
    return React.forwardRef(component);
};

exports.pickDefinedFn = function (ref, ks, obj) {
    const copy = {}
    for (let i = 0; i < ks.length; i++) {
        if (obj[ks[i]] !== undefined) {
            copy[ks[i]] = obj[ks[i]];
        }
    }
    if (ref !== undefined) {
        copy.ref = ref
    }
    return copy;
};

exports.createRef = React.createRef

exports.unsafeMergeSecond = (r1) => (r2) => {
    for (var k1 in r2) {
        if ({}.hasOwnProperty.call(r2, k1) && r2[k1] !== undefined) {
            r1[k1] = r2[k1];
        }
    }
    return r1
}

exports.unsafeUnionDroppingUndefined = (r1) => (r2) => {
    var copy = {};
    for (var k1 in r2) {
        if ({}.hasOwnProperty.call(r2, k1) && r2[k1] !== undefined) {
            copy[k1] = r2[k1];
        }
    }
    for (var k2 in r1) {
        if ({}.hasOwnProperty.call(r1, k2) && r1[k2] !== undefined) {
            copy[k2] = r1[k2];
        }
    }
    return copy;
}