const updateUsername = async (event) => {
    event.stopPropagation();

    const username = document.querySelector("#username-update-input").value.trim();

    if (username) {

        const response = await fetch('/api/users/update/username', {
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



$('#updateUsernameModal').on('shown.bs.modal', function () {
    $('#modal-container').trigger('focus')
})

document
    .querySelector('#update-form-btn')
    .addEventListener('click', updateUsername);



const deleteAccount = async (event) => {
    event.stopPropagation();

    if (confirm("Are you sure?")) {
        const response = await fetch("api/users/delete", {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Failed to delete user")
        }
    }
};

document.querySelector("#account-delete-btn").addEventListener("click", deleteAccount);
