const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');
const snackbar = document.getElementById('snackbar');
let isValid = true;

/*
* Helper Functions
* */
const validateData = (data) => {
    const { firstname, lastname, email, queryType, message, consent } = data;

    isValid = true;
    handleValidation("fname", isEmptyField(firstname));
    handleValidation("lname", isEmptyField(lastname));
    handleValidation("email", isEmptyField(email) && isInvalidMail(email));
    handleValidation("query-type", isMissingCheck(queryType));
    handleValidation("message", isEmptyField(message));
    handleValidation("consent", isMissingCheck(consent));
}

const isEmptyField = (value) => {
    return (value == null || value === '')
}

const isInvalidMail = (value) => {
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value);
}

const isMissingCheck = (value) => {
    return (value == null || value === 'no')
}

const handleValidation = (field, isFieldInValid) => {
    // handle error texts
    const errorText = document.getElementById(field + "-error" );
    if (isFieldInValid) {
        isValid = false;
        errorText.classList.remove("error__hide");
    } else {
        errorText.classList.add("error__hide");
    }

    // handle red borders
    const fieldElement = document.getElementById(field);
    if (!fieldElement) { return}

    if (isFieldInValid) {
        fieldElement.classList.add("error__field");
    } else {
        fieldElement.classList.remove("error__field");
    }
}


/*
* Event Listeners
* */
form.addEventListener('input', function (e) {
    e.preventDefault();
    handleValidation(e.target.id, isEmptyField(e.target.value));
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);
    validateData(data);

    if (isValid) {
        snackbar.classList.add("snackbar_show");
        setTimeout(() => {
            snackbar.classList.remove("snackbar_show");
        }, 3000);

        form.reset()
    }
});