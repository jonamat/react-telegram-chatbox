/* -------------------------------------------------------------------------- *
 * Copyright (c) Jonathan Mataloni. All rights reserved.
 * Licensed under the MIT License.
 * See License.txt in the project root for license information.
 *
 * ------------------------- Integration test suite ------------------------- *
 *
 * Target: Library
 * Tests:
 * - Exports
 *
 * -------------------------------------------------------------------------- */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

/* ---------------------------- Component to test --------------------------- */

import MyLibrary from '../src';

/* -------------------------------------------------------------------------- */
/*                                    Mocks                                   */
/* -------------------------------------------------------------------------- */

const consoleError = jest.fn();
Object.defineProperty(console, 'error', {
    get() {
        return consoleError;
    },
});

/* -------------------------------------------------------------------------- */
/*                              Bridge operations                             */
/* -------------------------------------------------------------------------- */

beforeEach(() => {
    consoleError.mockClear();
});

/* -------------------------------------------------------------------------- */
/*                               Render wrapper                               */
/* -------------------------------------------------------------------------- */

/**
 * Render the component with the custom configuration
 * @param props Component props
 */
const renderComponent = (props?) => render(<MyLibrary.MyComponent {...props} />);

/* -------------------------------------------------------------------------- */
/*                                    Tests                                   */
/* -------------------------------------------------------------------------- */

describe('Component', () => {
    it('render properly', () => {
        expect(() => {
            const { queryByTestId } = renderComponent({ myProp: <span data-testid="children">mars</span> });

            expect(consoleError).not.toBeCalled();
            expect(queryByTestId('children')).toBeInTheDocument();
        }).not.toThrowError();
    });
});
