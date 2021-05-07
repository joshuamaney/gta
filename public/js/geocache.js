// Add geocache

// Edit geocache

// Delete geocache

const deleteGeocache = async (event) => {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    const element = event.target;

    console.log("hit");
    console.log(element.getAttribute("data-index"));

    let id = element.getAttribute("data-index");

    const response = await fetch(`/api/geocaches/delete/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert("Failed to delete geocache")
    }
};

$(document).on("click", '.geocache-delete-btn', deleteGeocache);