// created signup.js and signup.handlebars to create signup form and save values for users
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get values for signup form 
  const name = document.querySelector('#name-signup').value.trim();
  const img = document.querySelector('#img-signup').value.trim();
  const height = document.querySelector('#height-signup').value.trim();
  const weight = document.querySelector('#weight-signup').value.trim();
  const goals = document.querySelector('#goals-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    // Send Post Request to API endpoint
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name,
        img,
        height,
        weight,
        goals,
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If successful, redirect the browser to the profile page
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};
// methods and event listeners
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
