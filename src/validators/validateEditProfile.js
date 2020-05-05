export default function validateEditProfile(values){
    let errors = {};

    //username errors
    if(!values.name){
        errors.name = "A username is required.";
    }
    //email errros
    if(!values.email){
        errors.email = "Your email is required"
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Your email is invalid";
    }

    //current password errors
    if(!values.currentPassword){
        errors.currentPassword = "Your current password is required"
    }else if (values.currentPassword.length < 6){
        errors.currentPassword = "Your current password must be at least 6 characters";
    }

    //New Password errors
    if(!values.newPassword.length < 6){
        errors.newPassword = "Your new password must be at least 6 characters";
    }

    return errors;
}
