import React, { useState, useEffect } from 'react';
import CartList from './CartList';
import styles from './SalesPage.module.css';
import logo from '../../imgs/logo2.png';
import perfil_btn from '../../imgs/perfil-btn.png';
import relatorio_btn from '../../imgs/relatorio-btn.png';
import logo_client from '../../imgs/logo_cliente.png';

function SalesPage() {
    const [cartItems, setCartItems] = useState([]);
    const [productId, setProductId] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Limpa o timer quando o componente desmonta
    }, []);

    const formatTime = (time) => {
        return time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className={styles.salesPage}>
            <div className={styles.salesMenu}>
                <div className={styles.leftMenu}>
                    <div className={styles.marcaClient}>
                        <img src={logo_client} className={styles.logoClient}></img>
                        <h3 className={styles.nomeClient}>Bar do Bola</h3>
                    </div>
                    <div className={styles.clockContainer}>
                        <div className={styles.data}>{formatDate(currentTime)} - </div>
                        <div className={styles.hora}>{formatTime(currentTime)}</div>
                    </div>
                </div>
                <div className={styles.rightMenu}>
                    <div className={styles.logoPointify}>
                        <img src={logo} alt="Logo Pointfy" className={styles.logo} id="logo" />
                    </div>
                    <div className={styles.menu}>
                        <button className={styles.btnRelatorio}>
                            <img src={relatorio_btn} className={styles.relatorio_img} alt='Relatório'></img>
                        </button>
                        <button className={styles.btnPerfil}>
                            <img src={perfil_btn} className={styles.perfil_img} alt='Perfil'></img>
                        </button>
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
