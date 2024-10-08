import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image pour Home Page',

      options: {
        hotspot: true,
      },
    },
  ],
})
