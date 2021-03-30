import React, { useState } from 'react';
import './addForm.css';

const AddForm = (props) => {
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");

    const [validEmail, setValidEmail] = useState(false);
    const [validPhone, setValidPhone] = useState(false);

    const validEmailCheck = (email) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexp.test(email) !== true) {
            setValidEmail(false);
        } else {
            setValidEmail(true);
        }
    }

    const validPhoneNumber = (phone) => {
        console.log(phone.length)
        if (phone.length < 12 && phone.length > 8) {
            setValidPhone(true)
        } else {
            setValidPhone(false)
        }
    }

    const submitForm = () => {
        console.log("child")
        props.onSubmit(newName, newEmail, newPhone, validPhone, validEmail)
        setNewName("")
        setNewEmail("")
        setNewPhone("")
        setValidPhone(false)
        setValidEmail(false)
    }

    return (
        <div>
        <div className="form">
                <div className="nameInputContainer">
                    <input
                        type="text"
                        className="nameInput"
                        placeholder="Full name"
                        maxLength={25}
                        value={newName}
                        onChange={newName => setNewName(newName.target.value)}
                    ></input>
                </div>
                <div className="emailInputContainer">
                    <input
                        type="email"
                        className="emailInput"
                        placeholder="E-mail address"
                        onBlur={() => validEmailCheck(newEmail)}
                        value={newEmail}
                        onChange={newEmail => setNewEmail(newEmail.target.value)}
                    ></input>
                </div>
                <div className="phoneInputContainer">
                    <input
                        type="number"
                        className="phoneInput"
                        placeholder="Phone number"
                        maxLength={13}
                        onBlur={() => validPhoneNumber(newPhone)}
                        value={newPhone}
                        onChange={newPhone => setNewPhone(newPhone.target.value)}
                    ></input>
                </div>
                <div className="submitContainer">
                    <button type="button" className="submitNew" onClick={submitForm}>Add new</button>
                </div>
            </div>
            <p className="addWarning">{props.warning}</p>
            </div>
    )
}

export default AddForm;