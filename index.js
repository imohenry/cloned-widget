// inserting Template
get_template().then((e) => {
	const t_form = e.querySelector("#form_template");
	const clone = t_form.content.cloneNode(true);
	clone
		.querySelector("button")
		.addEventListener("click", function (e) {
			// Your click event logic here
			const form_raw = document.forms["qt_lead_form"];
			console.log("form_raw: ", form_raw);
			const form = new FormData(form_raw);
			alert(JSON.stringify(Object.fromEntries(form.entries())));

			console.log("hello world");
			e.preventDefault();
		});

	const placements = document.querySelectorAll(".placement");
	const holder = [...placements];
	console.log("holder: ", holder);
	console.log("placements: ", placements);
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

document.getElementById('form_details').addEventListener('submit', async function(event) {
	event.preventDefault();
  
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
  
	  // Submit data regardless of response status
	  smartech('create', 'ADGMOT35CHFLVDHBJNIG50K968HGC4AU9CK8VRN68EHEH9MQ0RU0');
	  smartech('register', 'ed71c43ad003846d01e0e99be1c64d00');
	  smartech('identify', '');
  
	  smartech('dispatch', 1, {
		  "s^url": "<Replace url value here>",
		  "i^sts": "<Replace sts value here>",
		  "i^pts": "<Replace pts value here>",
		  "i^npv": "<Replace npv value here>",
		  "s^title": "<Replace title value here>"
	  });
	  await smartech('identify', emailAddress);
	  await smartech('dispatch', "boost_ebook_data", {
		  "email": emailAddress,
		  "FIRSTNAME": firstName,
		  "LASTNAME": lastName,
		  "PHONENUMBER": number,
		  "OTHERS": password
	  });
	  await smartech('contact', '412', {
		  'pk^email': emailAddress,
		  "FIRSTNAME": firstName,
		  "LASTNAME": lastName,
		  "PHONENUMBER": number,
		  "OTHERS": password
	  });
		const scriptURL = "https://script.google.com/macros/s/AKfycbxgnjgjzV0rrutXF977EGcihKNYrInBp5je2cV53nvBzBFpAvzQdaOI_KuTbnKs5u5B4A/exec"; 
		const form = document.getElementById('form_details');
		const formData = new FormData(form);
		await fetch(scriptURL, { method: "POST", body: new FormData(form) },
		{ mode: 'no-cors'}
		// .then((res) => res.json())
		// .then((data) => console.log(data))
		);
		console.log("FormData:", formData);
  
	   // Handle success and existing user scenarios based on the API response
	  if (response.ok) {
		
  
		Swal.fire({
		  icon: 'success',
		  title: 'Welcome!',
		  text: 'Your account has been successfully created. Click on Download Ebook to get your copy.',
		  // showCancelButton: true,
		  // cancelButtonColor: '#d33',
		  confirmButtonText: 'Download Ebook',
		  // cancelButtonText: 'Close'
		}) .then((result) => {
		  if (result.isConfirmed) {
			downloadPDF();
		  }
		});
  
		// Clear the form after successful submission
		const form = document.getElementById('form_details');
		form.reset();
	  } else if (response.status === 400) {
		Swal.fire({
		  icon: 'warning',
		  title: 'Already Registered',
		  text: 'You are already registered. Click on Download Ebook to get your copy.',
		  // showCancelButton: true,
		  // confirmButtonColor: '#3085d6',
		  // cancelButtonColor: '#d33',
		  confirmButtonText: 'Download Ebook',
		  // cancelButtonText: 'Close'
		}).then((result) => {
		  if (result.isConfirmed) {
			downloadPDF();
		  }
		});
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
  
