export default function validateCreateLink(values){
    let errors = {};

    //Description Errors
    if(!values.description){
        errors.description = "A Description is Required";
    }else if (values.description.length < 10 ){
        errors.description = "Your description must be at least 10 characters";
    }

    //URL Errors
    if(!values.url){
        errors.url = "A URL required"
    }else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        errors.url = "The URL must be valid.";
    }
    return errors;
}
