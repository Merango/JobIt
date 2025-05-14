# JobIt Application

## Project Setup

### Testing Dependencies
To set up testing dependencies, run:
\`\`\`bash
npm install --save-dev jest @types/jest ts-jest typescript
\`\`\`

Configure Jest in your `jest.config.js`:
\`\`\`javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
\`\`\`

### Running Tests
\`\`\`bash
npm test
\`\`\`