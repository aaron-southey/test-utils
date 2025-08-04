# Test Utils - Serverless Test Data API

A powerful TypeScript library and serverless API for generating realistic test data with comprehensive locale support. Built with Faker.js and deployed on Vercel.

## 🌟 Live API

**API Base URL:** `https://test-utils.aaronsouthey.dev`

Try it now:
- 📖 [API Documentation](https://test-utils.aaronsouthey.dev/api/docs)
- 🎲 [Random Person](https://test-utils.aaronsouthey.dev/api/person/random)
- 🇩🇪 [German Person](https://test-utils.aaronsouthey.dev/api/person/random?locale=de)
- 👨‍💼 [Adult Person](https://test-utils.aaronsouthey.dev/api/person/adult)

## 🌟 Features

- **Multiple Deployment Options**: Use as npm library or serverless API
- **Locale Support**: Generate data for UK, US, Germany, France, Spain, Italy
- **Flexible Person Builder**: Fluent API for building test persons
- **Age Categories**: Adults, children, seniors with customizable age ranges
- **Serverless API**: RESTful endpoints deployed on Vercel
- **TypeScript**: Full type safety and IntelliSense support

## 🚀 Quick Start

### As Serverless API

Deploy instantly to Vercel:

```bash
# Clone and deploy
git clone <your-repo>
cd test-utils
npm install
vercel --prod
```

### As NPM Library

```bash
npm install
npm run build
```

```typescript
import { PersonBuilder } from './src';

// Generate random UK person
const person = PersonBuilder.uk().build();

// Generate German adult
const adult = PersonBuilder.adult(25, 'de').build();
```

## 🌐 API Endpoints

### Base URL: `https://test-utils.aaronsouthey.dev`

| Endpoint | Description | Example |
|----------|-------------|---------|
| `/api/person/random` | Random person | `?locale=de&count=3` |
| `/api/person/adult` | Adult (18+) | `?minAge=25&locale=fr` |
| `/api/person/child` | Child (0-17) | `?maxAge=12&locale=es` |
| `/api/person/senior` | Senior (65+) | `?minAge=70&locale=it` |
| `/api/person/custom` | Custom fields | `?forename=John&city=London` |

### Example API Response

```json
{
  "data": {
    "name": { "forename": "Hans", "surname": "Müller" },
    "dateOfBirth": "1985-03-15T00:00:00.000Z",
    "address": {
      "houseNumber": "42",
      "street": "Hauptstraße",
      "town": "Bayern",
      "city": "München", 
      "postcode": "80331"
    }
  },
  "meta": {
    "locale": "de",
    "type": "random",
    "generated": "2025-08-04T12:00:00.000Z"
  }
}
```

## 📚 Library Usage

### Basic Examples

```typescript
import { PersonBuilder } from './src';

// Random person with default locale (UK)
const randomPerson = PersonBuilder.random().build();

// German person
const germanPerson = PersonBuilder.german().build();

// US adult aged 25-40
const usAdult = PersonBuilder.us()
  .setRandomDateOfBirth({ minAge: 25, maxAge: 40 })
  .build();

// Custom person with specific fields
const customPerson = PersonBuilder.empty()
  .setForename('John')
  .setSurname('Doe')
  .setAddress({ city: 'London' })
  .build();
```

## 🛠️ Development & Deployment

### Automatic Deployment 🚀
This project is configured for automatic deployment:
- **Production:** Every push to `main` branch → `https://test-utils.aaronsouthey.dev`
- **Preview:** Every pull request → unique preview URL
- **Branches:** Any branch push → development URL

### Local Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build TypeScript
npm run build
```

### Manual Deployment (if needed)
```bash
# Deploy to Vercel
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

## 📄 License

MIT License - see LICENSE file for details.

