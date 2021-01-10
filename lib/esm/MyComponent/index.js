/* -------------------------------------------------------------------------- *
 * Copyright (c) Jonathan Mataloni. All rights reserved.
 * Licensed under the MIT License.
 * See License.txt in the project root for license information.
 * -------------------------------------------------------------------------- */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * MyComponent description.
 *
 * See [Docs](https://github.com/jonamat/react-library-boilerplate).
 */
const MyComponent = (props) => {
    return React.createElement(React.Fragment, null,
        "Hello ",
        props.myProp || 'world',
        "!");
};
MyComponent.propTypes = {
    myProp: PropTypes.element,
};
export default MyComponent;
