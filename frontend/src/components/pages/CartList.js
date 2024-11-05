import React from 'react';
import './CartList.css'; // Certifique-se de que o CSS está sendo importado

function CartList({ cartItems, setCartItems }) {
    const handleIncreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
                    : item
            )
        );
    };

    const handleDecreaseQuantity = (id) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1, subtotal: (item.quantity - 1) * item.price }
                    : item
            );

            // Filtra itens com quantidade zero
            return updatedItems.filter((item) => item.quantity > 0);
        });
    };

    const handleRemove = (id) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity - item.quantity, subtotal: (item.quantity - item.quantity ) * item.price }
                    : item
            );

            // Filtra itens com quantidade zero
            return updatedItems.filter((item) => item.quantity > 0);
        });
    }

    return (
        <div className="cart-list">
            <h3>Carrinho</h3>
            {cartItems.length === 0 ? (
                <p>O carrinho está vazio.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Qtd</th>
                            <th>Valor</th>
                            <th>Subtotal</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id} className="cart-item-row">
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                    </div>
                                </td>
                                <td>R$ {item.price.toFixed(2)}</td>
                                <td>R$ {item.subtotal.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleRemove(item.id)}>Remover</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CartList;
