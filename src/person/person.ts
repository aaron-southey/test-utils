import { faker } from '@faker-js/faker/locale/en_GB';
import { IPerson } from "./person.interface"

const person = (): IPerson => {
    return {
        name: {
            forename: faker.person.firstName(),
            surname: faker.person.lastName()
        },
        age: {
            dob: faker.date.birthdate(),
            age: 22
        },
        address: {
            houseNumber: faker.location.buildingNumber(),
            street: faker.location.street(),
            town: faker.location.county(), // Nothing really matters here for data purposes - just another string.
            city: faker.location.city(),
            postcode: faker.location.zipCode()
        }
        
    }
}

export default { person }