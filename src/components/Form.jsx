import { useState } from "react"
import PropTypes from 'prop-types';

const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    query: "",
    message: "",
    consent: false,
}
export default function Form({ onSuccess }) {
    const [ values, setValues ] = useState(initialValue);
    const [ errors, setErrors ] = useState({});

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setValues( prevState => ({
            ...prevState,
            [name] : type === "checkbox" ? checked : value,
        }))
    }

    function validateForm() {
        const regex = /^\w+([. -]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

        let formErrors = {};

        if( values.firstName === "" ) formErrors.firstName = "this field is required";
        if( values.lastName === "" ) formErrors.lastName = "this field is required";
        if( values.message === "" ) formErrors.message = "this field is required";
        if( values.email === "" ) {
            formErrors.email = "this field is required";
        } else if ( !values.email.match(regex) ) {
            formErrors.email = "Please enter a valid email address";
        }
        if( !values.consent ) formErrors.consent = "To submit this form, please consent to being contact";
        if( !values.query ) formErrors.query = "Please select a query type";

        setErrors(formErrors);
        
        return Object.keys(formErrors).length === 0;
    }

    function resetForm() {
        setValues(initialValue);
    }

    function submitForm(e) {
        e.preventDefault();
        if( validateForm() ) {
            onSuccess();
            resetForm();
        }
    }

    return (
        <form onSubmit={submitForm}>
            {/* name */}
            <div className="name-container">
                <div className="form-control">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        id="firstName"
                        className={errors.firstName ? "error" : undefined }
                        name="firstName" 
                        value={values.firstName} 
                        onChange={handleChange}
                    />
                    { errors.firstName && <p className="errorMsg" id="firstNameError">{errors.firstName}</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        className={errors.lastName ? "error" : undefined }
                        name="lastName" 
                        value={values.lastName} 
                        onChange={handleChange} 
                    />
                    { errors.lastName && <p className="errorMsg" id="lastNameError">{errors.lastName}</p>}
                    
                </div>
            </div>
            {/* email */}
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    className={errors.email ? "error" : undefined }
                    name="email" 
                    value={values.email} 
                    onChange={handleChange} 
                />
                { errors.email && <p className="errorMsg" id="emailError">{errors.email}</p>}
                
            </div>
            {/* query type */}
            <div className="form-control">
                <fieldset>
                    <legend>Query Type</legend>
                    <div className="radio-container">
                        <div>
                            <input 
                                type="radio"
                                name="query"
                                id="general"
                                value="General Enquiry"
                                checked={values.query === "General Enquiry"} 
                                onChange={handleChange}
                            />
                            <label htmlFor="general">General Enquiry</label>
                        </div>
                        <div>
                            <input 
                                type="radio"
                                name="query"
                                id="support"
                                value="Support Request"
                                checked={values.query === "Support Request"} 
                                onChange={handleChange}
                            />
                            <label htmlFor="support">Support Request</label>
                        </div>
                    </div>
                </fieldset>
                { errors.query && <p className="errorMsg" id="queryError">{errors.query}</p>}
                
            </div>
            {/* message */}
            <div className="form-control">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={values.message} onChange={handleChange} />
                {errors.message && <p className="errorMsg">{errors.message}</p>}
            </div>
            {/* consent */}
            <div className="form-control">
                <div className="checkbox-container">
                    <input 
                        type="checkbox"
                        name="consent"
                        id="consent"

                        value={values.checked}
                        onChange={handleChange}
                    />
                    <label htmlFor="consent">
                        I consent to being contacted by the team
                    </label>
                </div>
                { errors.consent && <p className="errorMsg" id="consentError">{errors.consent}</p>}
                
            </div>
            {/* submit */}
            <div className="form-control">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

Form.propTypes = {
    onSuccess: PropTypes.bool.isRequired
};