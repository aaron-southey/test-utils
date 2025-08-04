export type PersonName = {
  forename: string;
  surname: string;
};

export type PersonAddress = {
  houseNumber: string;
  street: string;
  town: string;
  city: string;
  postcode: string;
};

export type Person = {
  name: PersonName;
  dateOfBirth: Date;
  address: PersonAddress;
};

// If you need age as a property, you could have a computed type:
export type PersonWithAge = Person & {
  age: number;
};
