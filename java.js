document.addEventListener('DOMContentLoaded', function() {
    addComment('Nandhitha', 'Great Product');

    document.getElementById('commentForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        addComment(name, comment);

        document.getElementById('commentForm').reset();
    });
});

function addComment(name, comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    commentElement.innerHTML = `<strong>${name}:</strong> <p>${comment}</p>`;
    document.getElementById('commentList').appendChild(commentElement);
}

document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    const clearCartButton = document.getElementById('clearCartButton');

    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    function showMessage(text) {
        messageElement.innerText = text;
        setTimeout(() => {
            messageElement.innerText = '';
        }, 2000);
    }

    
    function addToCart(productName, productPrice) {
        cart.push({ name: productName, price: parseFloat(productPrice) });
        localStorage.setItem('cart', JSON.stringify(cart));
        showMessage('Item added to cart!');
        updateCartUI(); 
    }

    
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>No items in the cart.</p>';
            totalAmountElement.innerText = 'Total: ₹0';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price;
            });

            totalAmountElement.innerText = `Total: ₹${total}`;
        }
    }

    
    function clearCart() {
        localStorage.removeItem('cart');
        cart.length = 0;  
        updateCartUI();   
        showMessage('Cart cleared!');
    }

    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemElement = event.target.parentElement;
            const productName = itemElement.getAttribute('data-product-name');
            const productPrice = itemElement.getAttribute('data-product-price');

            addToCart(productName, productPrice);
        });
    });

    
    clearCartButton.addEventListener('click', () => {
        clearCart();
    });

   
    updateCartUI();
});

document.getElementById('placeOrderButton').addEventListener('click', function() {
    alert('Your order has been placed successfully!');
});