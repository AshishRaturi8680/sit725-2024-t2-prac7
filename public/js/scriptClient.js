document.addEventListener('DOMContentLoaded', () => {
    // Initialize Materialize components
    M.Modal.init(document.querySelectorAll('.modal'));

    // Event listener for the phone form submission (Static Setup)
    const form = document.getElementById('phoneForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Gather form data
            const phone = {
                title: document.getElementById('title').value,
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                price: document.getElementById('price').value,
                features: document.getElementById('features').value,
                imageName: document.getElementById('imageName').value // For MongoDB setup
            };

            // Send form data to the server
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
    }

    // Function to dynamically add phone cards to the page
    function addPhoneCard(phone) {
        const cardSection = document.getElementById('card-section');
        if (cardSection) {
            const card = `
                <div class="col s12 m4 l3">
                    <div class="card">
                        <div class="card-image">
                            <img src="images/${phone.imageName}" alt="${phone.title}">
                        </div>
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
    }

    // Fetch and display existing phones on page load
    async function fetchPhones() {
        try {
            const response = await fetch('/api/phones');
            if (response.ok) {
                const data = await response.json();
                data.data.forEach(phone => addPhoneCard(phone));
            } else {
                M.toast({ html: 'Error fetching phones' });
            }
        } catch (error) {
            M.toast({ html: 'Error fetching phones' });
        }
    }

    // Call fetchPhones to display data when the page loads
    fetchPhones();
});
