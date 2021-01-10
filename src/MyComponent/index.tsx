/* -------------------------------------------------------------------------- *
 * Copyright (c) Jonathan Mataloni. All rights reserved.
 * Licensed under the MIT License.
 * See License.txt in the project root for license information.
 * -------------------------------------------------------------------------- */

import React, { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';

export interface MyComponentProps {
    /** Inline prop doc example. Default `world` */
    myProp?: ReactNode;
}

/**
 * MyComponent description.
 *
 * See [Docs](https://github.com/jonamat/react-library-boilerplate).
 */
const MyComponent: FC<MyComponentProps> = (props) => {
    return <>Hello {props.myProp || 'world'}!</>;
};

MyComponent.propTypes = {
    myProp: PropTypes.element,
};

export default MyComponent;
