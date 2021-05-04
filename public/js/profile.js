const updateUsername = async (event) => {
    event.stopPropagation();

    const username = document.querySelector("#username-update-input").value.trim();

    if (username) {

        const response = await fetch('/api/users/update', {
            method: 'PUT',
            body: JSON.stringify({ username }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert(response.statusText);
        }
    }
};

$('#username-update-btn').on('shown.bs.modal', function () {
    $('#modal-container').trigger('focus')
  })

document
    .querySelector('#update-form-btn')
    .addEventListener('click', updateUsername);