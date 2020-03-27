import Validator from 'validator';
import { isEmpty, isEqual } from 'lodash/';
import axios from 'axios';

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

function EmptyFieldCheck(data){
    return !data;
}

function NonAlphaNumCheck(data){
    return !Validator.isAlphanumeric(data);
}

function LessLengthCheck(data, num){
    return data.length < num;
}

function PasswordNotMatchCheck(password1, password2){
    return !Validator.equals(password1, password2)
}

function AuxFieldCheck(stateData, data, name, num, isPassword, isPassword2, isCountry){
    let checkMsg = '';

    if(EmptyFieldCheck(data)){
        checkMsg = "This field is required"
    }
    else if(!isCountry && !isPassword2 && NonAlphaNumCheck(data)){
        checkMsg = `${capitalize(name)} can only contain alphabets or numbers`
    }
    else if(!isCountry && !isPassword2 && LessLengthCheck(data, num)){
        checkMsg = `${capitalize(name)} must be greater than ${num}`
    }
    else if(isPassword && stateData.confirmPassword.length > 0){
        if(!PasswordNotMatchCheck(stateData.password, stateData.confirmPassword)){
            return { 
                'confirmPassword': undefined,
                'password': undefined
            };
        }
        else if(isPassword2){
            return { 'confirmPassword': 'Passwords must match' };
        }
        else{
            return { 
                'confirmPassword': 'Passwords must match',
                'password': undefined
            };
        }
    }
    else{
        return { [name]: undefined };
    }
    return { [name]: checkMsg };
}

async function UserEntryCheck(data){
    let check = {};
    const res = await axios.post('http://localhost:4000/api/users', { 'username': data })
    return res;
}

function UsernameFieldCheck(stateData, data){
    let check = AuxFieldCheck(stateData, data, 'username', 4, false, false, false);

    // if no error found, check whether username has existed or not
    if (isEqual(check, { 'username': undefined})){
        UserEntryCheck()
    }
    console.log('222')
    return check;
}

function PasswordFieldCheck(stateData, data){
    return AuxFieldCheck(stateData, data, 'password', 6, true, false, false);
}

function ConfirmPasswordFieldCheck(stateData, data){
    return AuxFieldCheck(stateData, data, 'confirmPassword', -1, true, true, false);
}

function CountryFieldCheck(stateData, data){
    return AuxFieldCheck(stateData, data, 'country', -1, false, false, true);
}


export function FieldCheck(stateData, data, name){
    switch (name) {
        case 'username':
            return UsernameFieldCheck(stateData, data);
        case 'password':
            return PasswordFieldCheck(stateData, data);
        case 'confirmPassword':
            return ConfirmPasswordFieldCheck(stateData, data);
        case 'country':
            return CountryFieldCheck(stateData, data);
        default:
            break;
    }
}

export function validateInput({username, password, confirmPassword, country}){
    let errors = {}

    if (!username){
        errors.username = "This field is required"
    }
    if (!password){
        errors.password = "This field is required"
    }
    if (!confirmPassword){
        errors.confirmPassword = "This field is required"
    }
    if (!Validator.equals(password, confirmPassword)){
        errors.confirmPassword = "Passwords must match."
    }
    if (!country){
        errors.country = "This field is required"
    }
    
    return {errors, isValid: isEmpty(errors)}
}
