import React, { useEffect, useState } from 'react';
import './participantTable.css';
import { v4 as uuidv4 } from 'uuid';
import { MdCreate, MdDelete, MdArrowDownward, MdArrowUpward  } from "react-icons/md";
import { generateParticipants } from '../utils/participantGenerator';
import AddForm from '../components/addForm';

const Table = () => {
    const [participants, setParticipants] = useState([]);

    const [warning, setWarning] = useState("")
    const [editWarning, setEditWarning] = useState("")

    const [sort, setSort] = useState("");
    const [reverseName, setReverseName] = useState(false);
    const [reverseEmail, setReverseEmail] = useState(false);
    const [reversePhone, setReversePhone] = useState(false);

    const [validEmail, setValidEmail] = useState(false);
    const [validPhone, setValidPhone] = useState(false);

    const [edit, setEdit] = useState(false);
    const [editID, setEditID] = useState("");
    const [editedName, seteditedName] = useState("");
    const [editedEmail, seteditedEmail] = useState("");
    const [editedPhone, seteditedPhone] = useState("");

    const upArrowIcon = <MdArrowUpward size={24} color="#909090" className="sorterIcon" />;
    const downArrowIcon = <MdArrowDownward size={24} color="#909090" className="sorterIcon" />;

    useEffect(() => {
        const getData = async () => {
            setParticipants( await generateParticipants());
        }
        getData()
    },[]);

    // Sorts the participant array by chosen attribute
    const sortByName = (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0
    }
    const sortByEmail = (a, b) => {
        if (a.email < b.email) {
            return -1;
        }
        if (a.email > b.email) {
            return 1;
        }
        return 0
    }
    const sortByPhone = (a, b) => {
        if (a.phonenumber < b.phonenumber) {
            return -1;
        }
        if (a.phonenumber > b.phonenumber) {
            return 1;
        }
        return 0
    }

    // Changes sorting according to pressed category
    const changeSorting = (token) => {
        setSort(token)
        switch(token) {
            case "Name":
                if (reverseName === false) {
                    setParticipants(participants.sort(sortByName))
                    setReverseName(true)
                    setReverseEmail(false)
                    setReversePhone(false)
                } else {
                    setParticipants(participants.sort(sortByName).reverse())
                    setReverseName(false)
                }
                break;
            case "Email":
                if (reverseEmail === false) {
                    setParticipants(participants.sort(sortByEmail))
                    setReverseEmail(true)
                    setReverseName(false)
                    setReversePhone(false)
                } else {
                    setParticipants(participants.sort(sortByEmail).reverse())
                    setReverseEmail(false)
                }
                break;
            case "Phone":
                if (reversePhone === false) {
                    setParticipants(participants.sort(sortByPhone))
                    setReversePhone(true)
                    setReverseName(false)
                    setReverseEmail(false)
                } else {
                    setParticipants(participants.sort(sortByPhone).reverse())
                    setReversePhone(false)
                }
                break;
            default:
                return null;
        }
    }

    // Refreshes sorting after editing and adding
    const refreshSorting = (token) => {
        switch(token) {
            case "Name":
                if (reverseName === true) {
                    setParticipants(participants.sort(sortByName))
                } else {
                    setParticipants(participants.sort(sortByName).reverse())
                }
                break;
            case "Email":
                if (reverseEmail === true) {
                    setParticipants(participants.sort(sortByEmail))
                } else {
                    setParticipants(participants.sort(sortByEmail).reverse())
                }
                break;
            case "Phone":
                if (reversePhone === true) {
                    setParticipants(participants.sort(sortByPhone))
                } else {
                    setParticipants(participants.sort(sortByPhone).reverse())
                }
                break;
            default:
                return null;
        }
    }

    // Renders the arrow icon for chosen sorting category
    const nameIcon = () => {
        if (sort === "Name") {
            if (reverseName === false) {
                return upArrowIcon;
            } else if ( reverseName === true) {
                return downArrowIcon;
            }
        } 
    }
    const emailIcon = () => {
        if (sort === "Email") {
            if (reverseEmail === false) {
                return upArrowIcon;
            } else if ( reverseEmail === true) {
                return downArrowIcon;
            }
        }
    }
    const phoneIcon = () => {
        if (sort === "Phone") {
            if (reversePhone === false) {
                return upArrowIcon;
            } else if ( reversePhone === true) {
                return downArrowIcon;
            }
        }
    }

    // Email regex validator
    const validEmailCheck = (email) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexp.test(email) !== true) {
            setValidEmail(false);
        } else {
            setValidEmail(true);
        }
    }

    // Phone number validator
    const validPhoneNumber = (phone) => {
        const max = 12;
        const min = 8;
        if (phone.length < max && phone.length > min) {
            setValidPhone(true)
        } else {
            setValidPhone(false)
        }
    }

    // Removes participant from array
    const removeObject = (item) => {
        const index = participants.indexOf(item);
        if (index > -1) {
            participants.splice(index, 1);
        }
        setParticipants([...participants]);
    }

    const pressEdit = (item) => {
        setValidEmail(true)
        setValidPhone(true)
        setEdit(true)
        seteditedName(item.name)
        seteditedEmail(item.email)
        seteditedPhone(item.phonenumber)
        setEditID(item.id)
    }

    const pressCancel = () => {
        setEdit(false)
        setEditID("")
        seteditedName("")
        seteditedEmail("")
        seteditedPhone("")
    }

    // Saves edited participant if editing passes validation
    const saveEditing = (item) => {
        if (validPhone === true && validEmail === true) {
            if(editedName.length > 1) {
                const index = participants.indexOf(item);
                const editedObj = {
                    id: item.id,
                    name: editedName,
                    email: editedEmail,
                    phonenumber: editedPhone
            }
            if (index > -1) {
                participants.splice(index, 1);
                participants.push(editedObj)
            }
            setParticipants([...participants]);
            refreshSorting(sort)
            setEdit(false)
            setValidPhone(false)
            setValidEmail(false)
            setEditWarning("")
            } else {
                setEditWarning("Name not acceptable")
            }
        } else {
            setEditWarning("Incorrect email or phone number")
        }
    }

    // Submit new participant through AddForm component
    const submitNew = (name, email, phone, validPhone, validEmail) => {
        console.log("Parent")
        console.log(validPhone, validEmail)
        if (validPhone === true && validEmail === true) {
            if (name.length > 1) {
            participants.push({
                id: uuidv4(),
                name: name,
                phonenumber: phone,
                email: email
            })
            setParticipants([...participants])
            refreshSorting(sort)
            setWarning("")
            } else {
                setWarning("Name must contain at least 2 letters.")
            }
        }else {
            setWarning("Incorrect email address or phone number.")
        }
    }

    const renderButtons = (edit, i) => {
        if (edit === true) {
            return (
                <div className="buttonGrp">
                    <button className="buttonCancel" onClick={pressCancel}>Cancel</button>
                    <button className="buttonSave" onClick={() => saveEditing(i)}>Save</button>
                </div>
            )
        } else {
            return (
                <div className="buttonGrp">
                    <button className="button" onClick={() => pressEdit(i)}>
                        <MdCreate size={24} color="#909090" />
                    </button>
                    <button className="button" onClick={() => removeObject(i)}>
                        <MdDelete size={24} color="#909090" />
                    </button>
                </div>
            )
        }
    }

    // Renders the list of participants and editable column for editable participant if editing
    const renderlist = (i) => {
        if (i.id === editID && edit === true){
            return (
                <li key={i.id} className="listItem">
                <div className="listItemContainer">
                    <input type="text" maxLength={25} className="listItemNameE"  value={editedName} onChange={editedName => seteditedName(editedName.target.value)}></input>
                    <input type="text" onBlur={() => validEmailCheck(editedEmail)} className="listItemEmailE" value={editedEmail} onChange={editedEmail => seteditedEmail(editedEmail.target.value)}></input>
                    <input type="number" maxLength={13} onBlur={() => validPhoneNumber(editedPhone)} className="listItemPhoneE" value={editedPhone} onChange={editedPhone => seteditedPhone(editedPhone.target.value)}></input>
                    {renderButtons(true, i)}
                </div>
                <div>
                    <p className="editWarning">{editWarning}</p>
                </div>
            </li>
            )
        } else {
            return(
                <li key={i.id} className="listItem">
                <div className="listItemContainer">
                    <p className="listItemName">{i.name}</p>
                    <p className="listItemEmail">{i.email}</p>
                    <p className="listItemPhone">{i.phonenumber}</p>
                    {renderButtons(false, i)}
                </div>
            </li>
            )
        }
    }

    return (
        <div className="base">
        <div className="container">
            <div className="headerContainer">
                <h2 className="header">List of participants</h2>
            </div>
            <AddForm onSubmit={submitNew} warning={warning} />
            <div className="sorter">
                <div className="sorterItemName" onClick={() => changeSorting("Name")}>
                    <p className="sorterText">Name</p>
                    {nameIcon()}
                </div>
                <div className="sorterItemEmail" onClick={() => changeSorting("Email")}>
                    <p className="sorterText">E-mail address</p>
                    {emailIcon()}
                </div>
                <div className="sorterItemPhone" onClick={() => changeSorting("Phone")}>
                    <p className="sorterText">Phone number</p>
                    {phoneIcon()}
                </div>
            </div>
            {participants.map(i => renderlist(i))}
        </div>
        </div>
    )
}

export default Table