const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Email is not valid');
    return false;
  }
}

// Check required field
function checkRequired(inputArr) {
  const valid = Array(inputArr.length).fill(false);
  inputArr.forEach(function (input, index) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      return false;
    } else {
      valid[index] = true;
      showSuccess(input);
      return true;
    }
  });
  return valid.every((x) => x);
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(inputa)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
    return true;
  }
}

// Check passwords match
function checkPasswordsMatcdh(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
    return false;
  } else {
    return true;
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const valid = [
    checkRequired([username, email, password, password2]),
    checkLength(username, 3, 15),
    checkLength(password, 6, 25),
    checkLength(password2, 6, 25),
    checkEmail(email),
    checkPasswordsMatcdh(password, password2),
  ];
  if (valid.includes(false)) {
    console.log("the form isn't valid");
  } else {
    console.log('SUCCESS');
    form.submit();
  }
});
