
function passwordValidation() {
	var password = document.getElementById('password');
	if(password.value.length == 0) {
		alert("Password cannot be blank.");
		password.focus();
		return false;
	}
	
	var isValid = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/".test(password.value);
	if(!isValid)
	{
		alert("Password must be more than 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character for security purposes.");
		password.focus();
		return false;
	}
}

function cpasswordValidation(str) {
	var cpassword = document.getElementById('cpassword');
	if(cpassword.value.length == 0) {
		alert("Confirm Password cannot be blank.");
		cpassword.focus();
		return false;
	}
	
	var isValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/.test(str);
	if(!isValid)
	{
		alert("Password must be more than 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character for security purposes.");
		password.focus();
		return false;
	}
}

function emailValidation(inputtext) {
	if(inputtext.value.length == 0) {
		alert("Email cannot be blank.");
		inputtext.focus();
		return false;
	}
	var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	if(inputtext.value.match(emailExp)) {
		return true;
	} else {
		alert("Email is invalid. Please Try Again.");
		inputtext.focus();
		return false;
	}
}
