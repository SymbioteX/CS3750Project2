var form = document.getElementById("myForm");

function passwordValidation() {
	console.log("I'm in passwordvalidation");

	console.log(form.password.value);

	var passValid = true;
	
	if(form.password.value.length < 6) {
		//alert("Password cannot be less than 6 characters.");
		document.querySelector('.content .value').innerHTML += '<br /><br />Password cannot be less than 6 characters.';
		//password.focus();
		passValid = false;
	}

	if(form.cpassword.value.length < 6) {
		//alert("Confirm Password cannot be less than 6 characters.");
		document.querySelector('.content .value').innerHTML += '<br /><br />Password cannot be less than 6 characters.';
		//password.focus();
		passValid = false;
	}
	

	if (form.password.value==form.cpassword.value)
	{
		console.log("passwords match");
	}
	else
	{
		document.querySelector('.content .value').innerHTML += '<br /><br />passwords do not match.';

		//console.log("passwords do not match");
		passValid = false;
	}
	return passValid;
	
	

}



function usernameValidation() {	
	console.log("I'm in email validation");
	console.log(form.username.value);


	var usernameIsValid = true;

	if(form.username.value.length == 0) {
		document.querySelector('.content .value').innerHTML += '<br /><br />Username cannot be blank.';
		//form.username.focus();
		usernameIsValid = false;
	}

	var usernameExp = "^[a-zA-Z0_-]*$"; ///^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	if(form.username.value.match(usernameExp)) 
	{
	} 
	else {
		document.querySelector('.content .value').innerHTML += '<br />Username is invalid. Please Try Again. Use only Alphanumeric Characters, _ , and -.';
		//alert("Username is invalid. Please Try Again. Use only Alphanumeric Characters, _ , and -.");
		//form.username.focus();
		usernameIsValid = false;
	}
	
	return usernameIsValid;
}



function emailValidation() {	//inputtext
	console.log("I'm in email validation");
	console.log(form.email.value);


	var emailIsValid = true;
	if(form.email.value.length == 0) {
		document.querySelector('.content .value').innerHTML += '<br /><br />Email cannot be blank.';
		//alert("Email cannot be blank.");
		//form.email.focus();
		emailIsValid = false;
	}
	
	var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	if(form.email.value.match(emailExp)) {
	} else {
		document.querySelector('.content .value').innerHTML += '<br /><br />Email is invalid. Please Try Again.';

		//alert("Email is invalid. Please Try Again.");
		//form.email.focus();
		emailIsValid = false;
	}
	return emailIsValid;
}


function nameValidation() {	//inputtext
	console.log("I'm in name validation");
	console.log(form.firstname.value);


	var nameIsValid = true;

	if(form.firstname.value.length == 0) {
		document.querySelector('.content .value').innerHTML += '<br /><br />First Name cannot be blank.';
		//alert("Email cannot be blank.");
		//form.firstname.focus();
		nameIsValid = false;
	}

	if(form.lastname.value.length == 0) {
		document.querySelector('.content .value').innerHTML += '<br /><br />Last Name cannot be blank..';
		//alert("Email cannot be blank.");
		//form.lastname.focus();
		nameIsValid = false;
	}

	return nameIsValid;
}




form.addEventListener("submit", function(evt){
	document.querySelector('.content .value').innerHTML = '';


	var isValid = usernameValidation();
	isValid = emailValidation() && isValid;
	isValid = nameValidation() && isValid;
	isValid =  passwordValidation() && isValid;
	document.querySelector('.content .value').innerHTML = 'Errors: ' +document.querySelector('.content .value').innerHTML +'<br /><br />'

	if (!isValid)
	{
		evt.preventDefault();
	}
	
})
