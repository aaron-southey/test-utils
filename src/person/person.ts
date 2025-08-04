import { Faker, en_GB } from '@faker-js/faker';
import { Person, PersonWithAge } from '../types/person.types';
import { addAge } from '../utils/person.utils';

// Create a faker instance with UK locale
const fakerGB = new Faker({ locale: [en_GB] });

/**
 * Generate a random person with basic information
*/
export const createPerson = (): Person => {
    return {
        name: {
            forename: fakerGB.person.firstName(),
            surname: fakerGB.person.lastName()
        },
        dateOfBirth: fakerGB.date.birthdate(),
        address: {
            houseNumber: fakerGB.location.buildingNumber(),
            street: fakerGB.location.street(),
            town: fakerGB.location.county(),
            city: fakerGB.location.city(),
            postcode: fakerGB.location.zipCode()
        }
    };
};

/**
 * Generate a random person with calculated age
*/
export const createPersonWithAge = (): PersonWithAge => {
    const person = createPerson();
    return addAge(person);
};

// Export both functions as default
export default {
    createPerson,
    createPersonWithAge
};