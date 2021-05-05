const createLocationHandler = async (event) => {
  event.stopPropagation();

  // Collect values from the login form
  const title = document.querySelector('#title').value ? document.querySelector('#title').value.trim() : null;
  const description = document.querySelector('#description').value ? document.querySelector('#description').value.trim() : null;
  const hint = document.querySelector('#hint').value ? document.querySelector('#hint').value.trim() : null;
  let { lat, lng } = window.current_position;
  if (title && lat && lng) {
    // Send a POST request to the API endpoint
    console.log(JSON.stringify({ title, description, hint, lat, lng }));
    const response = await fetch('/api/location', {
      method: 'POST',
      body: JSON.stringify({ title, description, hint, latitude: lat, longitude: lng }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  } else {
    alert('Please include title and description.');
  }
};

$('#createModal').on('shown.bs.modal', function () {
  let { lat, lng } = window.current_position;
  $('#latitude').text(lat);
  $('#longitude').text(lng);
  $('#modal-container').trigger('focus')
  
})

document
  .querySelector('#create-btn')
  .addEventListener('click', createLocationHandler);


