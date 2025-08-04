import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    title: 'Test Utils API Documentation',
    version: '1.0.0',
    description: 'Generate realistic test data for persons with locale support',
    baseUrl: 'https://test-utils.aaronsouthey.dev',
    endpoints: {
      '/api/person/random': {
        method: 'GET',
        description: 'Generate random person data',
        parameters: {
          locale: 'Locale code (en_GB, en_US, de, fr, es, it) - default: en_GB',
          count: 'Number of persons to generate (max 10) - default: 1',
          includeAge: 'Include calculated age - default: false'
        },
        examples: [
          '/api/person/random',
          '/api/person/random?locale=de&count=3',
          '/api/person/random?includeAge=true&locale=fr'
        ]
      },
      '/api/person/adult': {
        method: 'GET',
        description: 'Generate adult person data',
        parameters: {
          locale: 'Locale code - default: en_GB',
          count: 'Number of persons - default: 1',
          minAge: 'Minimum age - default: 18',
          includeAge: 'Include calculated age - default: false'
        },
        examples: [
          '/api/person/adult',
          '/api/person/adult?minAge=25&locale=es',
          '/api/person/adult?count=2&includeAge=true'
        ]
      },
      '/api/person/child': {
        method: 'GET',
        description: 'Generate child person data',
        parameters: {
          locale: 'Locale code - default: en_GB',
          count: 'Number of persons - default: 1',
          maxAge: 'Maximum age - default: 17',
          includeAge: 'Include calculated age - default: false'
        },
        examples: [
          '/api/person/child',
          '/api/person/child?maxAge=12&locale=de',
          '/api/person/child?count=3&includeAge=true'
        ]
      },
      '/api/person/senior': {
        method: 'GET',
        description: 'Generate senior person data',
        parameters: {
          locale: 'Locale code - default: en_GB',
          count: 'Number of persons - default: 1',
          minAge: 'Minimum age - default: 65',
          includeAge: 'Include calculated age - default: false'
        },
        examples: [
          '/api/person/senior',
          '/api/person/senior?minAge=70&locale=it',
          '/api/person/senior?count=2&includeAge=true'
        ]
      },
      '/api/person/minimal': {
        method: 'GET',
        description: 'Generate minimal person data (name + DOB only)',
        parameters: {
          locale: 'Locale code - default: en_GB',
          count: 'Number of persons - default: 1',
          includeAge: 'Include calculated age - default: false'
        },
        examples: [
          '/api/person/minimal',
          '/api/person/minimal?locale=fr&count=5'
        ]
      },
      '/api/person/custom': {
        method: 'GET',
        description: 'Generate custom person data with specific fields',
        parameters: {
          locale: 'Locale code - default: en_GB',
          count: 'Number of persons - default: 1',
          minAge: 'Minimum age',
          maxAge: 'Maximum age',
          forename: 'Specific forename',
          surname: 'Specific surname',
          city: 'Specific city',
          useRandomDefaults: 'Use random defaults - default: true',
          includeAge: 'Include calculated age - default: false'
        },
        examples: [
          '/api/person/custom?forename=John&city=London',
          '/api/person/custom?minAge=25&maxAge=35&locale=de',
          '/api/person/custom?surname=Smith&useRandomDefaults=false'
        ]
      }
    },
    supportedLocales: {
      'en_GB': 'United Kingdom',
      'en_US': 'United States',
      'de': 'Germany',
      'fr': 'France',
      'es': 'Spain',
      'it': 'Italy'
    },
    responseFormat: {
      data: 'Person object or array of person objects',
      meta: {
        count: 'Number of generated persons',
        locale: 'Used locale',
        type: 'Type of generation (random, adult, child, etc.)',
        generated: 'ISO timestamp of generation'
      }
    },
    rateLimits: {
      maxPersonsPerRequest: 10,
      note: 'Requests are limited to prevent abuse'
    }
  });
}
