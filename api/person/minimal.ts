import { VercelRequest, VercelResponse } from '@vercel/node';
import { PersonBuilder } from '../../src/person/personBuilder';
import { calculateAge } from '../../src/utils/person.utils';

function parseQueryParams(query: any) {
  return {
    locale: (query.locale as string) || 'en_GB',
    count: parseInt(query.count as string) || 1,
    includeAge: query.includeAge === 'true'
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
    const { locale, count, includeAge } = parseQueryParams(req.query);
    
    const persons = Array.from({ length: Math.min(count, 10) }, () => {
      const person = PersonBuilder.minimal(locale || 'en_GB').build();
      return addAgeIfRequested(person, includeAge);
    });

    res.status(200).json({
      data: count === 1 ? persons[0] : persons,
      meta: {
        count: persons.length,
        locale,
        includeAge,
        type: 'minimal',
        generated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate minimal person data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
