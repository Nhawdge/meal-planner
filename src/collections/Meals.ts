import { CollectionConfig } from 'payload/types';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Meals: CollectionConfig = {
  slug: 'meals',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: "ingredients",
      type: 'relationship',
      relationTo: 'ingredients',
      hasMany: true,
    },
    {
      name: 'directions',
      type: 'richText'
    }
  ],
}

export default Meals;