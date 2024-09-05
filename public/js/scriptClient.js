document.addEventListener('DOMContentLoaded', function() {
    var socket = io();  // Connect to the server using Socket.IO

    const phoneForm = document.getElementById('phoneForm');
    const cardSection = document.getElementById('card-section');

    phoneForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const phoneData = {
            title: document.getElementById('title').value,
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            price: document.getElementById('price').value,
            features: document.getElementById('features').value
        };

        await fetch('/api/phone', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(phoneData)
        });

        phoneForm.reset();
    });

    socket.on('phoneUpdate', (phone) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-content">
                <span class="card-title">${phone.title}</span>
                <p>Brand: ${phone.brand}</p>
                <p>Model: ${phone.model}</p>
                <p>Price: ${phone.price}</p>
                <p>Features: ${phone.features}</p>
            </div>
        `;
        cardSection.appendChild(card);
    });
});
