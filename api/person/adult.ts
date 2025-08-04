import { VercelRequest, VercelResponse } from '@vercel/node';
import { PersonBuilder } from '../../src/person/personBuilder';
import { calculateAge } from '../../src/utils/person.utils';

// Helper function to parse query parameters
function parseQueryParams(query: any) {
  return {
    locale: (query.locale as string) || 'en_GB',
    count: parseInt(query.count as string) || 1,
    minAge: query.minAge ? parseInt(query.minAge as string) : 18,
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
    const { locale, count, minAge, includeAge } = parseQueryParams(req.query);
    // Always default to 'en_GB' if locale is missing, empty, or invalid
    const safeLocale = (typeof locale === 'string' && locale.trim()) ? locale : 'en_GB';
    // Generate multiple adult persons
    const persons = Array.from({ length: Math.min(count, 10) }, () => {
      const person = PersonBuilder.adult(minAge, safeLocale).build();
      return addAgeIfRequested(person, includeAge);
    });

    res.status(200).json({
      data: count === 1 ? persons[0] : persons,
      meta: {
        count: persons.length,
        locale: safeLocale,
        minAge,
        includeAge,
        type: 'adult',
        generated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate adult person data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
