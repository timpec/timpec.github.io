// Generate 20 random users, with random ids, names, emails and phonenumbers
import { v4 as uuidv4 } from 'uuid';
import {getRandomName} from './httpsGetName';

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const generatePhoneNumber = () => {
    // 040,041,042,043,044,045,046 possibilities for 3 first numbers
    let rndmPhoneNumber = "04";
    rndmPhoneNumber += getRandomInt(6);

    // Generate rest of the number
    for (let i = 0; i < 7; i++) {
        rndmPhoneNumber += getRandomInt(9)
    }
    return rndmPhoneNumber;
}

// Generate email based on the name of the user and a random number
const generateEmail = (name) => {
    const emailOptions = ["gmail", "hotmail", "outlook", "live"];
    return getRandomInt(9) + name + "@" + emailOptions[getRandomInt(4)] + ".com"
}

// Builds a participant object with random id, name, email and phonenumber and returns array
export const generateParticipants = async () => {
    const httpCall = await getRandomName()
    let array = [];

    for (let i = 0; i < 20; i++) {
        const id = uuidv4();
        const fname = await httpCall.results[i].name.first
        const lname = await httpCall.results[i].name.last
        const phonenumber = generatePhoneNumber()
        const email = generateEmail(fname);

        array.push({
            id,
            name: fname+" "+lname,
            phonenumber,
            email
        })
    }
    return array
}