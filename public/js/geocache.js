// Add geocache

// Edit geocache

// Delete geocache

const deleteGeocache = async (event) => {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    const element = event.target;

    let id = element.getAttribute("data-index");

    if (confirm("Are you sure?")) {
        const response = await fetch(`/api/geocaches/delete/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert("Failed to delete geocache")
        }
    }
};

$(document).on("click", '.geocache-delete-btn', deleteGeocache);