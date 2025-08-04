# Test Utils API - Vercel Deployment

A serverless API for generating realistic test data with locale support, deployed on Vercel.

## 🚀 Live Demo

Once deployed, your API will be available at: `https://test-utils.aaronsouthey.dev`

## 📋 Prerequisites

- Node.js 18+ 
- Vercel CLI (`npm i -g vercel`)
- Git repository

## 🛠️ Deployment Steps

### Option 1: Automatic Deployment (Recommended)

#### 1. Connect GitHub Repository to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository (`aaron-southey/test-utils`)
4. Configure project settings:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave empty)
   - **Build Command:** `npm run build` (optional)
   - **Output Directory:** Leave empty (Vercel auto-detects API functions)
   - **Install Command:** `npm install`

#### 2. Configure Environment Variables (if needed)
- No environment variables required for basic setup
- Vercel automatically provides `VERCEL_URL` and `NODE_ENV`

#### 3. Deploy
- Click "Deploy" - your first deployment will start automatically
- Every push to `main` branch will trigger automatic deployment
- Pull requests will create preview deployments

### Option 2: Manual Deployment

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Local Development

```bash
# Start local development server
npm run dev
```

Your API will be available at `http://localhost:3000`

#### 3. Deploy to Vercel

```bash
# Login to Vercel (first time only)
vercel login

# Deploy to production
npm run deploy
```

Or deploy directly:

```bash
vercel --prod
```

## ⚡ Automatic Deployment Benefits

- **Zero Configuration:** Works out of the box with your current setup
- **Instant Deployments:** Usually complete in under 60 seconds
- **Preview Deployments:** Every PR gets its own URL for testing
- **Rollback Support:** Easy rollback to previous deployments
- **Branch Deployments:** Deploy feature branches for testing
- **Build Logs:** Full visibility into deployment process

## 🌐 API Endpoints

### Base URL
- Production: `https://test-utils.aaronsouthey.dev`
- Local: `http://localhost:3000`

### Available Endpoints

| Endpoint | Description | Example |
|----------|-------------|---------|
| `GET /api` | API information | `/api` |
| `GET /api/docs` | Full documentation | `/api/docs` |
| `GET /api/person/random` | Random person | `/api/person/random?locale=de&count=3` |
| `GET /api/person/adult` | Adult person | `/api/person/adult?minAge=25&locale=fr` |
| `GET /api/person/child` | Child person | `/api/person/child?maxAge=12&locale=es` |
| `GET /api/person/senior` | Senior person | `/api/person/senior?minAge=70&locale=it` |
| `GET /api/person/minimal` | Minimal data | `/api/person/minimal?locale=en_US` |
| `GET /api/person/custom` | Custom person | `/api/person/custom?forename=John&city=London` |

## 🗺️ Supported Locales

- `en_GB` - United Kingdom (default)
- `en_US` - United States  
- `de` - Germany
- `fr` - France
- `es` - Spain
- `it` - Italy

## 📝 Query Parameters

### Common Parameters
- `locale` - Locale code (default: `en_GB`)
- `count` - Number of persons to generate (max: 10, default: 1)
- `includeAge` - Include calculated age (default: `false`)

### Age-Specific Parameters
- `minAge` - Minimum age for adults/seniors
- `maxAge` - Maximum age for children

### Custom Parameters
- `forename` - Specific first name
- `surname` - Specific last name
- `city` - Specific city
- `useRandomDefaults` - Use random defaults (default: `true`)

## 📊 Response Format

```json
{
  "data": {
    "name": {
      "forename": "John",
      "surname": "Smith"
    },
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "address": {
      "houseNumber": "123",
      "street": "Main Street",
      "town": "Westminster",
      "city": "London",
      "postcode": "SW1A 1AA"
    },
    "calculatedAge": 34
  },
  "meta": {
    "count": 1,
    "locale": "en_GB",
    "type": "random",
    "includeAge": true,
    "generated": "2025-08-04T12:00:00.000Z"
  }
}
```

## 🔧 Environment Variables

Vercel automatically provides:
- `VERCEL_URL` - Your deployment URL
- `NODE_ENV` - Environment (production/development)

## 🌐 Custom Domain Setup

This API is configured to use the custom domain `test-utils.aaronsouthey.dev`. 

### Automatic Setup (After GitHub Integration)
1. In Vercel Dashboard → Project Settings → Domains
2. Add `test-utils.aaronsouthey.dev`
3. Vercel will automatically configure SSL and provide DNS instructions
4. Domain will be active on all future deployments

### Manual Domain Setup
To set up your own custom domain:

### 1. Add Domain in Vercel Dashboard
1. Go to your project in the Vercel dashboard
2. Navigate to Settings → Domains
3. Add `test-utils.aaronsouthey.dev`
4. Follow Vercel's DNS configuration instructions

### 2. Configure DNS Records
Add the following DNS records to your domain provider:

**For subdomain (test-utils.aaronsouthey.dev):**
```
Type: CNAME
Name: test-utils
Value: cname.vercel-dns.com
```

**Or for apex domain (aaronsouthey.dev):**
```
Type: A
Name: @
Value: 76.76.19.61
```

### 3. SSL Certificate
Vercel automatically provisions SSL certificates for custom domains. The process usually takes a few minutes to complete.

## 🔄 Continuous Deployment Workflow

### Production Deployments
- Every push to `main` branch automatically deploys to production
- Domain: `https://test-utils.aaronsouthey.dev`
- Deployment status visible in GitHub commits

### Preview Deployments  
- Every pull request gets a unique preview URL
- Format: `https://test-utils-git-branch-name-aaron-southey.vercel.app`
- Perfect for testing changes before merging

### Branch Deployments
- Push to any branch creates a deployment
- Useful for feature testing and collaboration

## 📈 Usage Examples

### Generate Random UK Person
```bash
curl "https://test-utils.aaronsouthey.dev/api/person/random?locale=en_GB&includeAge=true"
```

### Generate 3 German Adults
```bash
curl "https://test-utils.aaronsouthey.dev/api/person/adult?locale=de&count=3&minAge=25"
```

### Generate Custom Person
```bash
curl "https://test-utils.aaronsouthey.dev/api/person/custom?forename=Maria&locale=es&city=Madrid"
```

### JavaScript/TypeScript Usage
```javascript
// Fetch random person
const response = await fetch('https://test-utils.aaronsouthey.dev/api/person/random?locale=de');
const { data } = await response.json();
console.log(data);

// Fetch multiple adults
const adults = await fetch('https://test-utils.aaronsouthey.dev/api/person/adult?count=5&includeAge=true');
const { data: adultData } = await adults.json();
```

## 🚦 Rate Limits

- Maximum 10 persons per request
- Standard Vercel serverless function limits apply

## 🛠️ Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Visit `http://localhost:3000/api/docs` for documentation

## 📁 Project Structure

```
├── api/                 # Vercel serverless functions
│   ├── index.ts        # Main API endpoint
│   ├── docs.ts         # Documentation endpoint
│   └── person/         # Person-related endpoints
│       ├── random.ts
│       ├── adult.ts
│       ├── child.ts
│       ├── senior.ts
│       ├── minimal.ts
│       └── custom.ts
├── src/                # Source code
│   ├── person/         # Person builders
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── vercel.json         # Vercel configuration
└── package.json        # Dependencies and scripts
```

## 🐛 Troubleshooting

### Build Errors
- Ensure all TypeScript files compile: `npm run build`
- Check import paths are correct for serverless environment
- Verify all dependencies are in `package.json`

### Deployment Issues
- Verify `vercel.json` configuration
- Check function size limits (50MB max)
- Ensure Node.js version compatibility (18+)
- Check GitHub integration is properly connected

### Automatic Deployment Issues
- Verify repository is connected in Vercel dashboard
- Check deployment logs in Vercel dashboard
- Ensure branch protection rules don't block deployments
- Verify custom domain DNS configuration

### API Errors
- Check Vercel function logs: `vercel logs`
- Verify environment variables are set
- Test endpoints locally first
- Check API route file structure matches Vercel requirements

### GitHub Integration Setup
1. **Connect Repository:** Vercel Dashboard → New Project → Import from GitHub
2. **Permissions:** Ensure Vercel has access to your repository
3. **Webhooks:** Vercel automatically sets up GitHub webhooks for deployments
4. **Status Checks:** Deployment status will show in GitHub commits and PRs

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Faker.js Documentation](https://fakerjs.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Deploy to preview: `vercel`
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
