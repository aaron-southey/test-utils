import { faker } from '@faker-js/faker/locale/en_GB';
import { Person, PersonWithAge } from '../types/person.types';
import { addAge } from '../utils/person.utils';

/**
 * Generate a random person with basic information
*/
export const createPerson = (): Person => {
    return {
        name: {
            forename: faker.person.firstName(),
            surname: faker.person.lastName()
        },
        dateOfBirth: faker.date.birthdate(),
        address: {
            houseNumber: faker.location.buildingNumber(),
            street: faker.location.street(),
            town: faker.location.county(),
            city: faker.location.city(),
            postcode: faker.location.zipCode()
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