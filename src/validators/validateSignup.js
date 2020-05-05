export default function validateSignup(values){
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

    //password errors
    if(!values.password){
        errors.password = "Your password is required"
    }else if (values.password.length < 6){
        errors.password = "Your Password must be at least 6 characters"
    }
    return errors;
}
