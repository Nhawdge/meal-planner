import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Ingredients from './collections/Ingredients';
import Meals from './collections/Meals';
import Products from './collections/Products';
import Reviews from './collections/Reviews';

export default buildConfig({
  serverURL: 'https://meal-planner-5i23.onrender.com',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Ingredients,
    Meals,
    Products,
    Reviews
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
