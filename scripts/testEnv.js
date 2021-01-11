const { configure } = require('@testing-library/dom');

// Disable massive DOM logs during testing library renders
configure({
    getElementError: (message, container) => {
        const error = new Error(message);
        error.name = 'TestingLibraryElementError';
        error.stack = null;
        return error;
    },
});

// Disable console errors and warns from source
console.error = jest.fn();
console.warn = jest.fn();
