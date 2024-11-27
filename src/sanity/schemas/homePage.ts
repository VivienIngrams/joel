import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'mainImages',
      type: 'array',
      title: 'Image(s) pour Home Page',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
})
