# PersonBuilder Locale Support - AI Generated

The PersonBuilder now includes comprehensive locale support, allowing you to generate test data that's appropriate for different countries and languages.

## Supported Locales

- `en_GB` - United Kingdom (default)
- `en_US` - United States
- `de` - Germany
- `fr` - France
- `es` - Spain
- `it` - Italy

## Usage Examples

### Basic Locale Usage

```typescript
import { PersonBuilder } from './person/personBuilder';

// Using constructor with locale option
const germanPerson = new PersonBuilder({ locale: 'de' }).build();

// Using static factory method with locale
const frenchPerson = PersonBuilder.random('fr').build();

// Using locale-specific factory methods
const ukPerson = PersonBuilder.uk().build();
const usPerson = PersonBuilder.us().build();
const germanPerson = PersonBuilder.german().build();
```

### Dynamic Locale Changes

```typescript
const builder = PersonBuilder.random('en_GB')
    .setLocale('de')        // Switch to German
    .setRandomName()        // Generate German names
    .setLocale('fr')        // Switch to French  
    .setRandomAddress()     // Generate French address
    .build();
```

### Locale-Specific Factory Methods

```typescript
// Quick access to common locales
const ukPerson = PersonBuilder.uk().build();
const usPerson = PersonBuilder.us().build();
const germanPerson = PersonBuilder.german().build();
const frenchPerson = PersonBuilder.french().build();
const spanishPerson = PersonBuilder.spanish().build();
const italianPerson = PersonBuilder.italian().build();
```

### Age Groups with Locale

```typescript
// Create adults with specific locales
const germanAdult = PersonBuilder.adult(25, 'de').build();
const frenchChild = PersonBuilder.child(12, 'fr').build();
const spanishSenior = PersonBuilder.senior(70, 'es').build();
```

### Checking Current Locale

```typescript
const builder = PersonBuilder.german();
console.log(builder.getLocale()); // 'de'
```

## What Changes by Locale

### Names
- **UK/US**: Traditional English names (John, Sarah, Smith, Johnson)
- **German**: German names (Hans, Greta, Müller, Schmidt)
- **French**: French names (Pierre, Marie, Dubois, Martin)
- **Spanish**: Spanish names (Carlos, Maria, García, López)
- **Italian**: Italian names (Marco, Francesca, Rossi, Bianchi)

### Addresses
- **UK**: British address formats with proper postcodes
- **US**: American address formats with ZIP codes
- **German**: German address formats with PLZ codes
- **French**: French address formats with postal codes
- **Spanish**: Spanish address formats
- **Italian**: Italian address formats

### Postal Codes
Each locale generates appropriate postal code formats:
- **UK**: SW1A 1AA format
- **US**: 12345 or 12345-6789 format
- **German**: 12345 format
- **French**: 12345 format

## Error Handling

If a locale is not supported or fails to load, the builder gracefully falls back to the default faker instance:

```typescript
// If 'invalid_locale' isn't supported, falls back to default
const person = new PersonBuilder({ locale: 'invalid_locale' }).build();
```

## Best Practices

1. **Consistent Locale**: Use the same locale throughout a test suite for consistency
2. **Test Multiple Locales**: Test your application with different locales to ensure internationalization works
3. **Locale-Specific Tests**: Create separate test cases for locale-specific business logic
4. **Fallback Testing**: Test that your application handles missing or invalid locale data gracefully

## Example Test Scenarios

```typescript
describe('PersonBuilder Locale Tests', () => {
    it('should generate appropriate UK data', () => {
        const person = PersonBuilder.uk().build();
        expect(person.address.postcode).toMatch(/^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/);
    });

    it('should generate appropriate US data', () => {
        const person = PersonBuilder.us().build();
        expect(person.address.postcode).toMatch(/^\d{5}(-\d{4})?$/);
    });

    it('should allow dynamic locale changes', () => {
        const builder = PersonBuilder.uk();
        expect(builder.getLocale()).toBe('en_GB');
        
        builder.setLocale('de');
        expect(builder.getLocale()).toBe('de');
    });
});
```
