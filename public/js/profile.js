const renderProfile = async (event) => {
    event.preventDefault();

    const response = await fetch('/profile', {
        method: 'POST',
        body: JSON.stringify({ username, email }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace("/profile");
    } else {
        alert(response.statusText);
    }
};
/*
document
    .querySelector('#profile-link')
    .addEventListener('click', renderProfile);
    */