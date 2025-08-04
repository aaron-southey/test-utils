import { faker, Faker } from '@faker-js/faker';
import { Person, PersonName, PersonAddress } from "../types/person.types";

type PersonBuilderOptions = {
    useRandomDefaults?: boolean;
    locale?: string;
};

class PersonBuilder {
    private person: Person;
    private useRandomDefaults: boolean;
    private locale: string;
    private fakerInstance: Faker;

    constructor(options: PersonBuilderOptions = {}) {
        this.useRandomDefaults = options.useRandomDefaults ?? true;
        this.locale = options.locale ?? 'en_GB';
        
        this.fakerInstance = this.createFakerInstance();
        this.person = this.useRandomDefaults ? this.createRandomPerson() : this.createEmptyPerson();
    }

    private createFakerInstance(): Faker {
        // Import the specific locale dynamically or use default
        try {
            switch (this.locale) {
                case 'en_US':
                    return new Faker({ locale: require('@faker-js/faker/locale/en_US') });
                case 'en_GB':
                    return new Faker({ locale: require('@faker-js/faker/locale/en_GB') });
                case 'de':
                    return new Faker({ locale: require('@faker-js/faker/locale/de') });
                case 'fr':
                    return new Faker({ locale: require('@faker-js/faker/locale/fr') });
                case 'es':
                    return new Faker({ locale: require('@faker-js/faker/locale/es') });
                case 'it':
                    return new Faker({ locale: require('@faker-js/faker/locale/it') });
                default:
                    return faker;
            }
        } catch {
            // If locale import fails, fallback to default faker
            return faker;
        }
    }

    private createRandomPerson(): Person {
        return {
            name: {
                forename: this.fakerInstance.person.firstName(),
                surname: this.fakerInstance.person.lastName()
            },
            dateOfBirth: this.fakerInstance.date.birthdate(),
            address: {
                houseNumber: this.fakerInstance.location.buildingNumber(),
                street: this.fakerInstance.location.street(),
                town: this.fakerInstance.location.county(),
                city: this.fakerInstance.location.city(),
                postcode: this.fakerInstance.location.zipCode()
            }
        };
    }

    private createEmptyPerson(): Person {
        return {
            name: {
                forename: "",
                surname: ""
            },
            dateOfBirth: new Date(),
            address: {
                houseNumber: "",
                street: "",
                town: "",
                city: "",
                postcode: ""
            }
        };
    }

    setForename(forename?: string): PersonBuilder {
        this.person.name.forename = forename ?? this.fakerInstance.person.firstName();
        return this;
    }

    setSurname(surname?: string): PersonBuilder {
        this.person.name.surname = surname ?? this.fakerInstance.person.lastName();
        return this;
    }

    setName(name?: Partial<PersonName>): PersonBuilder {
        this.person.name = {
            forename: name?.forename ?? this.fakerInstance.person.firstName(),
            surname: name?.surname ?? this.fakerInstance.person.lastName()
        };
        return this;
    }

    setRandomName(): PersonBuilder {
        this.person.name = {
            forename: this.fakerInstance.person.firstName(),
            surname: this.fakerInstance.person.lastName()
        };
        return this;
    }

    setDateOfBirth(dateOfBirth?: Date): PersonBuilder {
        this.person.dateOfBirth = dateOfBirth ?? this.fakerInstance.date.birthdate();
        return this;
    }

    setRandomDateOfBirth(options?: { minAge?: number; maxAge?: number }): PersonBuilder {
        const minAge = options?.minAge ?? 18;
        const maxAge = options?.maxAge ?? 80;
        this.person.dateOfBirth = this.fakerInstance.date.birthdate({ min: minAge, max: maxAge, mode: 'age' });
        return this;
    }

    setAddress(address?: Partial<PersonAddress>): PersonBuilder {
        this.person.address = {
            houseNumber: address?.houseNumber ?? this.fakerInstance.location.buildingNumber(),
            street: address?.street ?? this.fakerInstance.location.street(),
            town: address?.town ?? this.fakerInstance.location.county(),
            city: address?.city ?? this.fakerInstance.location.city(),
            postcode: address?.postcode ?? this.fakerInstance.location.zipCode()
        };
        return this;
    }

    setRandomAddress(): PersonBuilder {
        this.person.address = {
            houseNumber: this.fakerInstance.location.buildingNumber(),
            street: this.fakerInstance.location.street(),
            town: this.fakerInstance.location.county(),
            city: this.fakerInstance.location.city(),
            postcode: this.fakerInstance.location.zipCode()
        };
        return this;
    }

    setMinimalData(): PersonBuilder {
        this.person.name.forename = this.fakerInstance.person.firstName();
        this.person.name.surname = this.fakerInstance.person.lastName();
        this.person.dateOfBirth = this.fakerInstance.date.birthdate();
        return this;
    }

    setAdult(minAge: number = 18): PersonBuilder {
        const maxAge = 80;
        this.person.dateOfBirth = this.fakerInstance.date.birthdate({ min: minAge, max: maxAge, mode: 'age' });
        return this;
    }

    setChild(maxAge: number = 17): PersonBuilder {
        const minAge = 0;
        this.person.dateOfBirth = this.fakerInstance.date.birthdate({ min: minAge, max: maxAge, mode: 'age' });
        return this;
    }

    setSenior(minAge: number = 65): PersonBuilder {
        const maxAge = 95;
        this.person.dateOfBirth = this.fakerInstance.date.birthdate({ min: minAge, max: maxAge, mode: 'age' });
        return this;
    }

    randomize(): PersonBuilder {
        this.person = this.createRandomPerson();
        return this;
    }

    reset(): PersonBuilder {
        this.person = this.createEmptyPerson();
        return this;
    }

    setLocale(locale: string): PersonBuilder {
        this.locale = locale;
        this.fakerInstance = this.createFakerInstance();
        return this;
    }

    getLocale(): string {
        return this.locale;
    }

    static random(locale?: string): PersonBuilder {
        return new PersonBuilder({ useRandomDefaults: true, locale });
    }

    static empty(locale?: string): PersonBuilder {
        return new PersonBuilder({ useRandomDefaults: false, locale });
    }

    static adult(minAge: number = 18, locale?: string): PersonBuilder {
        return new PersonBuilder({ locale }).setAdult(minAge);
    }

    static child(maxAge: number = 17, locale?: string): PersonBuilder {
        return new PersonBuilder({ locale }).setChild(maxAge);
    }

    static senior(minAge: number = 65, locale?: string): PersonBuilder {
        return new PersonBuilder({ locale }).setSenior(minAge);
    }

    static minimal(locale?: string): PersonBuilder {
        return new PersonBuilder({ useRandomDefaults: false, locale }).setMinimalData();
    }

    static uk(): PersonBuilder {
        return new PersonBuilder({ locale: 'en_GB' });
    }

    static us(): PersonBuilder {
        return new PersonBuilder({ locale: 'en_US' });
    }

    static german(): PersonBuilder {
        return new PersonBuilder({ locale: 'de' });
    }

    static french(): PersonBuilder {
        return new PersonBuilder({ locale: 'fr' });
    }

    static spanish(): PersonBuilder {
        return new PersonBuilder({ locale: 'es' });
    }

    static italian(): PersonBuilder {
        return new PersonBuilder({ locale: 'it' });
    }

    build(): Person {
        return { ...this.person };
    }

    peek(): Person {
        return { ...this.person };
    }
}

export { PersonBuilder };
export default PersonBuilder;