import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import React from 'react';

// Mock Component to test hook
const TestComponent = () => {
    const { cart, addToCart, cartTotal } = useCart();
    return (
        <div>
            <div data-testid="cart-total">{cartTotal}</div>
            <button
                onClick={() => addToCart({ id: '1', name: 'Saree', price: 1000 })}
            >
                Add Item
            </button>
        </div>
    );
};

// Mock LocalStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => {
            store = {};
        })
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('CartContext', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    test('adds item to cart and updates total', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addButton = screen.getByText('Add Item');
        const totalDisplay = screen.getByTestId('cart-total');

        // Initial total should be 0
        expect(totalDisplay).toHaveTextContent('0');

        // Add Item
        act(() => {
            addButton.click();
        });

        // Total should be 1000
        expect(totalDisplay).toHaveTextContent('1000');
        expect(window.localStorage.setItem).toHaveBeenCalled();
    });
});
