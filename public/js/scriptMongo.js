document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    const form = document.getElementById('phoneForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const phone = {
            title: document.getElementById('title').value,
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            price: document.getElementById('price').value,
            features: document.getElementById('features').value,
        };

        try {
            const response = await fetch('/api/phone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(phone),
            });

            if (response.ok) {
                const data = await response.json();
                M.toast({ html: 'Phone added successfully' });
                addPhoneCard(data.data);
            } else {
                M.toast({ html: 'Error adding phone' });
            }
        } catch (error) {
            M.toast({ html: 'Error adding phone' });
        }
    });

    function addPhoneCard(phone) {
        const cardSection = document.getElementById('card-section');
        const card = `
            <div class="col s12 m4 l3">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${phone.title}</span>
                        <p><strong>Brand:</strong> ${phone.brand}</p>
                        <p><strong>Model:</strong> ${phone.model}</p>
                        <p><strong>Price:</strong> ${phone.price}</p>
                        <p><strong>Features:</strong> ${phone.features}</p>
                    </div>
                </div>
            </div>
        `;
        cardSection.insertAdjacentHTML('beforeend', card);
    }
});
