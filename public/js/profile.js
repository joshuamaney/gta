const renderProfile = async (event) => {
    event.preventDefault();

    const response = await fetch('/user', {
        method: 'GET',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log("sick!");
        // If successful, do nothing!
        return;
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('#profile-btn')
    .addEventListener('click', renderProfile);