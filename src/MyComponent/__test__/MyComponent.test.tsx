/* -------------------------------------------------------------------------- *
 * Copyright (c) Jonathan Mataloni. All rights reserved.
 * Licensed under the MIT License.
 * See License.txt in the project root for license information.
 *
 * ----------------------------- Unit test suite ---------------------------- *
 *
 * Target: Database update system (delete data)
 * Tests:
 * - Props validation
 * - Functionality
 * - Matching render snapshot
 *
 * -------------------------------------------------------------------------- */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { create } from 'react-test-renderer';

/* ---------------------------- Component to test --------------------------- */

import MyComponent, { MyComponentProps } from '..';

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
const renderComponent = (props?: MyComponentProps) => render(<MyComponent {...props} />);

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

    it('validates props', () => {
        expect(() => renderComponent({ myProp: { not: 'a react node' } })).toThrowError();
    });

    it('matches the snapshot', () => {
        const componentSnapshot = create(<MyComponent />).toJSON();
        expect(componentSnapshot).toMatchSnapshot();
    });
});
