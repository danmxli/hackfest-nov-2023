function CheckPasswordStrength(password: string) {
    // Check if the password has at least 8 characters
    if (password.length < 8) {
        return false;
    }

    // Check if the password contains both uppercase and lowercase letters
    if (
        !/[A-Z]/.test(password) || !/[a-z]/.test(password)
    ) {
        return false;
    }

    // Check if the password contains at least one number
    if (!/\d/.test(password)) {
        return false;
    }

    // Check if the password contains at least one special character
    let format = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
    if (!format.test(password)) {
        return false;
    }

    return true;
}

export default CheckPasswordStrength