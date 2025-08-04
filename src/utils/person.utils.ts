import { Person, PersonWithAge } from '../types/person.types';

/**
 * Calculate age from date of birth
 */
export const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Add calculated age to a Person object
 */
export const addAge = (person: Person): PersonWithAge => ({
  ...person,
  age: calculateAge(person.dateOfBirth),
});
