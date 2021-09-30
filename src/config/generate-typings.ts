import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

/* Script to generate typings for graphql schema files when changed */

// Script: npm run gt

const typeDefinitionsFactory = new GraphQLDefinitionsFactory();
typeDefinitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/config/graphql.schema.ts'), // Typings output file
});
