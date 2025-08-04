import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    message: 'Test Utils API',
    version: '1.0.0',
    endpoints: {
      person: {
        random: '/api/person/random',
        adult: '/api/person/adult',
        child: '/api/person/child',
        senior: '/api/person/senior',
        minimal: '/api/person/minimal',
        custom: '/api/person/custom'
      },
      locales: ['en_GB', 'en_US', 'de', 'fr', 'es', 'it'],
      documentation: '/api/docs'
    },
    usage: {
      examples: [
        '/api/person/random',
        '/api/person/random?locale=de',
        '/api/person/adult?minAge=25&locale=fr',
        '/api/person/custom?count=5&locale=es'
      ]
    }
  });
}
