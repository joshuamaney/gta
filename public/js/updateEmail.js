
const updateEmail = async (event) => {
    event.stopPropagation();

    const email = document.querySelector("#email-update-input").value.trim();

    if (email) {

        const response = await fetch('/api/users/update/email', {
            method: 'PUT',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert(response.statusText);
        }
    }
};



$('#updateEmailModal').on('shown.bs.modal', function () {
    $('#modal-container').trigger('focus')
})

document
    .querySelector('#email-update-form-btn')
    .addEventListener('click', updateEmail);