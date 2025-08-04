import { VercelRequest, VercelResponse } from '@vercel/node';
import { PersonBuilder } from '../../src/person/personBuilder';
import { calculateAge } from '../../src/utils/person.utils';

function parseQueryParams(query: any) {
  return {
    locale: query.locale as string || 'en_GB',
    count: parseInt(query.count as string) || 1,
    minAge: query.minAge ? parseInt(query.minAge as string) : undefined,
    maxAge: query.maxAge ? parseInt(query.maxAge as string) : undefined,
    includeAge: query.includeAge === 'true',
    forename: query.forename as string,
    surname: query.surname as string,
    city: query.city as string,
    useRandomDefaults: query.useRandomDefaults !== 'false'
  };
}

function addAgeIfRequested(person: any, includeAge: boolean) {
  if (includeAge) {
    return {
      ...person,
      calculatedAge: calculateAge(person.dateOfBirth)
    };
  }
  return person;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { 
      locale, 
      count, 
      minAge, 
      maxAge, 
      includeAge, 
      forename, 
      surname, 
      city,
      useRandomDefaults 
    } = parseQueryParams(req.query);
    
    const persons = Array.from({ length: Math.min(count, 10) }, () => {
      let builder = new PersonBuilder({ locale, useRandomDefaults });
      
      // Apply custom parameters
      if (forename) builder.setForename(forename);
      if (surname) builder.setSurname(surname);
      if (city) builder.setAddress({ city });
      
      // Apply age constraints
      if (minAge !== undefined && maxAge !== undefined) {
        builder.setRandomDateOfBirth({ minAge, maxAge });
      } else if (minAge !== undefined) {
        builder.setAdult(minAge);
      } else if (maxAge !== undefined) {
        builder.setChild(maxAge);
      }
      
      const person = builder.build();
      return addAgeIfRequested(person, includeAge);
    });

    res.status(200).json({
      data: count === 1 ? persons[0] : persons,
      meta: {
        count: persons.length,
        locale,
        minAge,
        maxAge,
        includeAge,
        customFields: {
          forename: !!forename,
          surname: !!surname,
          city: !!city
        },
        type: 'custom',
        generated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate custom person data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
