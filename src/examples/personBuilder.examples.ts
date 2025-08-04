import { PersonBuilder } from '../person/personBuilder';
import { calculateAge } from '../utils/person.utils';

/**
 * Examples of how to use the enhanced PersonBuilder for test utilities
 */

// Example 1: Create a completely random person with default locale (en_GB)
const randomPerson = PersonBuilder.random().build();
console.log('Random Person (UK):', randomPerson);

// Example 2: Create a random person with US locale
const randomPersonUS = PersonBuilder.random('en_US').build();
console.log('Random Person (US):', randomPersonUS);

// Example 3: Use locale-specific factory methods
const ukPerson = PersonBuilder.uk().build();
const usPerson = PersonBuilder.us().build();
const germanPerson = PersonBuilder.german().build();
const frenchPerson = PersonBuilder.french().build();

console.log('UK Person:', ukPerson);
console.log('German Person:', germanPerson);

// Example 4: Create an empty person and set specific values
const specificPerson = PersonBuilder.empty()
    .setForename('John')
    .setSurname('Doe')
    .setDateOfBirth(new Date('1990-01-01'))
    .setAddress({
        houseNumber: '123',
        street: 'Main Street',
        city: 'London'
        // Other address fields will be randomized with UK locale
    })
    .build();

// Example 5: Change locale dynamically
const dynamicLocalePerson = PersonBuilder.random()
    .setLocale('de') // Switch to German
    .setRandomName() // Generate German names
    .setLocale('fr') // Switch to French
    .setRandomAddress() // Generate French address
    .build();

console.log('Dynamic locale person:', dynamicLocalePerson);
console.log('Current locale:', PersonBuilder.random().getLocale());

// Example 6: Create an adult with specific locale
const germanAdult = PersonBuilder.adult(25, 'de').build();
console.log('German Adult age:', calculateAge(germanAdult.dateOfBirth));

// Example 7: Create a child with French locale
const frenchChild = PersonBuilder.child(12, 'fr').build();
console.log('French Child age:', calculateAge(frenchChild.dateOfBirth));

// Example 8: Chain multiple operations with locale
const customPerson = new PersonBuilder({ locale: 'es' })
    .setRandomName()
    .setAdult(30)
    .setRandomAddress()
    .build();

// Example 9: Create minimal test data with specific locale
const minimalGermanPerson = PersonBuilder.minimal('de').build();

// Example 10: Use optional parameters for partial randomization with locale
const partiallyRandomPerson = new PersonBuilder({ useRandomDefaults: false, locale: 'it' })
    .setForename() // Will generate random Italian forename
    .setSurname('Rossi') // Specific surname
    .setRandomDateOfBirth({ minAge: 20, maxAge: 40 })
    .build();

// Example 11: Reset and reuse builder with different locales
const builder = new PersonBuilder({ locale: 'en_GB' });
const person1 = builder.setForename('Alice').build();
const person2 = builder.setLocale('de').reset().setForename('Hans').build();

// Example 12: Compare different locale outputs
console.log('\n=== Locale Comparison ===');
console.log('UK Person:', PersonBuilder.uk().build());
console.log('US Person:', PersonBuilder.us().build());
console.log('German Person:', PersonBuilder.german().build());
console.log('French Person:', PersonBuilder.french().build());

export {
    randomPerson,
    randomPersonUS,
    ukPerson,
    usPerson,
    germanPerson,
    frenchPerson,
    specificPerson,
    dynamicLocalePerson,
    germanAdult,
    frenchChild,
    customPerson,
    minimalGermanPerson,
    partiallyRandomPerson
};
