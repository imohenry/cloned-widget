// inserting Template
get_template().then((e) => {
    const t_form = e.querySelector("#form_template");
    const clone = t_form.content.cloneNode(true);
  
    // Replace the button click event listener logic with the signup functionality
    clone
      .querySelector("button")
      .addEventListener("click", async function (e) {
        e.preventDefault();
  
        // Form data extraction
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const emailAddress = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const password = document.getElementById('password').value;
  
        // Form validation
        if (!firstName || !lastName || !emailAddress || !number || !password) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill out all fields!',
          });
          return;
        }
  
        const payload = {
          "countryCode": "NG",
          "emailAddress": emailAddress,
          "firstName": firstName,
          "lastName": lastName,
          "mobileNumber": number,
          "password": password,
          "referralCode": "",
          "referralId": ""
        };
  
        try {
          const response = await fetch('https://quickteller.com/api/v1/accounts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
  
          const data = await response.json();
  
          // Handle success and existing user scenarios based on the API response
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Welcome!',
              text: 'Your account has been successfully created.',
              confirmButtonText: 'ok',
            })
            // .then((result) => {
            //   if (result.isConfirmed) {
            //     downloadPDF();
            //   }
            // });
  
            // Clear the form after successful submission
            const form = document.getElementById('form_details');
            form.reset();
          } else if (response.status === 400) {
            Swal.fire({
              icon: 'warning',
              title: 'Already Registered',
              text: 'You are already registered.',
              confirmButtonText: 'ok',
            })
            // .then((result) => {
            //   if (result.isConfirmed) {
            //     downloadPDF();
            //   }
            // });
            const form = document.getElementById('form_details');
            form.reset();
          } else {
            // Handle unexpected errors
            throw new Error(`API returned unknown error: ${data}`);
          }
        } catch (error) {
          console.error('Error signing up:', error);
          Swal.fire({
            icon: 'error',
            title: 'Signup Failed',
            text: 'An error occurred while signing up. Please try again later.',
          });
        }
      });
  
    const placements = document.querySelectorAll(".placement");
    const holder = [...placements];
    if (holder.length > 0) {
      holder.forEach((e) => {
        e.appendChild(clone);
      });
    } else {
      document.body.appendChild(clone);
    }
  });
  
  get_styles();
  
  // Getting Template from another Page
  async function get_template() {
    const fetch_temp = await fetch(
      "https://dev-bazz.github.io/widget/temp",
    );
    const template = (await fetch_temp.text()).toString();
    const stringed = template.toString();
    const dom_P = new DOMParser().parseFromString(
      stringed,
      "text/html",
    );
    return dom_P;
  }
  
  // Getting Styles from another Page
  function get_styles() {
    // Create a link element
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://dev-bazz.github.io/widget/styles.css";
    // link.href = "/styles.css";
  
    // Append the link element to the head of the document
    document.head.appendChild(link);
  }
  
  
