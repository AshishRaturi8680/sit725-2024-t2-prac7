const addCards = (items) => {
    // Clear existing cards to prevent duplicates
    $('#card-section').empty();

    items.forEach(item => {
        let itemToAppend = `
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="images/${item.imageName}" alt="${item.title}">
                    </div>
                    <div class="card-content">
                        <span class="card-title">${item.title}</span>
                        <p><strong>Brand:</strong> ${item.brand}</p>
                        <p><strong>Model:</strong> ${item.model}</p>
                        <p><strong>Price:</strong> ${item.price}</p>
                        <p><strong>Features:</strong> ${item.features}</p>
                    </div>
                </div>
            </div>
        `;
        $("#card-section").append(itemToAppend);
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.brand = $('#brand').val();
    formData.model = $('#model').val();
    formData.price = $('#price').val();
    formData.features = $('#features').val();
    formData.imageName = $('#imageName').val();

    postPhone(formData);
}

function postPhone(phone) {
    $.ajax({
        url: '/api/phone',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(phone),
        success: (result) => {
            if (result.statusCode === 201) {
                alert('Phone added successfully');
                getAllPhones(); // Refresh the list
            }
        },
        error: (xhr, status, error) => {
            console.error('Error adding phone:', error);
        }
    });
}

function getAllPhones() {
    $.get('/api/phones', (response) => {
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function() {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        formSubmitted();
    });
    $('.modal').modal();
    getAllPhones();
});
