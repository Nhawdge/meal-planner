import { CollectionConfig } from 'payload/types';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'reviewName',
  },
  fields: [
    {
      name: 'reviewName',
      type: 'text',
    }, {
      name: 'meal',
      type: 'relationship',
      relationTo: 'meals',
      hasMany: true,
      required: true,
    }, {
      name: 'author',
      type: 'text',
    }, {
      name: 'date',
      type: 'date',
    }, {
      name: 'rating',
      type: 'number',
    },
  ],
}

export default Reviews;