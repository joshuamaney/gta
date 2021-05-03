const renderProfile = async (event) => {
    event.preventDefault();

    const response = await fetch('/user', {
        method: 'GET',
        body: JSON.stringify({ username, email }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace("/user");
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('#profile-btn')
    .addEventListener('click', renderProfile);