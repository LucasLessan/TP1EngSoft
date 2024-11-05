import React, { useState } from 'react';
import CartList from './CartList';
import styles from './SalesPage.module.css';
import logo from '../../imgs/logo2.png';
import perfil_btn from '../../imgs/perfil-btn.png';
import relatorio_btn from '../../imgs/relatorio-btn.jpg';

function SalesPage() {
    const [cartItems, setCartItems] = useState([]);
    const [productId, setProductId] = useState('');

    // Exemplo de produtos
    const products = [
        { id: 1, name: 'Produto A', price: 10.0 },
        { id: 2, name: 'Produto B', price: 20.0 },
        { id: 3, name: 'Produto C', price: 30.0 },
    ];

    const handleAddToCart = () => {
        const product = products.find((p) => p.id === parseInt(productId));
        if (!product) {
            alert('Produto não encontrado!');
            return;
        }

        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
                        : item
                )
            );
        } else {
            setCartItems((prevItems) => [
                ...prevItems,
                { ...product, quantity: 1, subtotal: product.price },
            ]);
        }

        setProductId('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddToCart();
        }
    };

    return (
        <div className={styles.salesPage}>
            <div className={styles.salesMenu}>
                <div className={styles.leftMenu}></div>
                <div className={styles.rightMenu}>
                    <div className={styles.logoPointify}>
                        <img src={logo} alt="Logo Pointfy" className={styles.logo} id="logo" />
                    </div>
                    <div className={styles.menu}>
                        <button className={styles.btnRelatorio}>Relatorio</button>
                        <button className={styles.btnPerfil}>Perfil</button>
                    </div>
                </div>
            </div>
            <div className={styles.productCartInfo}>
                <div className={styles.leftContainer}>
                    <div className={styles.cartContainer}>
                        <CartList cartItems={cartItems} setCartItems={setCartItems} />
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="number"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Digite o ID do produto"
                            className={styles.input}
                        />
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.infoContainer}>
                        <h2>Informações dos Produtos</h2>
                        {/* Aqui você pode adicionar detalhes dos produtos, formas de pagamento e total */}
                        <p>Detalhes do produto selecionado aqui...</p>
                        <h3>Total: R$ {cartItems.reduce((total, item) => total + item.subtotal, 0).toFixed(2)}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesPage;
