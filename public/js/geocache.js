/* Edit geocache */
const updateGeocache = async (event) => {
    event.stopPropagation();
    console.log("hit");

    const title = document.querySelector("#geocache-update-title").value.trim();
    const description = document.querySelector("#geocache-update-description").value.trim();
    const hint = document.querySelector("#geocache-update-hint").value.trim();
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/geocaches/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, hint, description }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace("/profile");
    } else {
        alert(response.statusText);
    }
    
};

document
    .querySelector('.update-geocache-btn')
    .addEventListener('click', updateGeocache);









// Delete geocache
const deleteGeocache = async (event) => {
    event.stopPropagation();

    const id = event.target.getAttribute('data-id');


    const response = await fetch(`/api/geocaches/delete/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace("/profile");
    } else {
        alert(response.statusText);

    }
};


$("[data-id]").on("click", deleteGeocache)