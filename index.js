// inserting Template
get_template().then((e) => {
	const t_form = e.querySelector("#form_template");
	const clone = t_form.content.cloneNode(true);
	clone
		.querySelector("button")
		.addEventListener("click", function (e) {
			// Your click event logic here
			console.log("hello world");
			e.preventDefault();
		});
	document.body.appendChild(clone);
});

get_styles();

// Getting Template from another Page
async function get_template() {
	const fetch_temp = await fetch("/temp.html");
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
	link.href = "/styles.css";

	// Append the link element to the head of the document
	document.head.appendChild(link);
}
