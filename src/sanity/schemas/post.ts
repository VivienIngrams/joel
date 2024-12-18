import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockContent',
    }),
    {
      name: 'mainImages',
      type: 'array',
      title: 'Image(s) pour Posts Page',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'layout',
      title: 'Image Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Square', value: 'square' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' },
          { title: 'Panorama', value: 'panorama' },
        ],
        layout: 'radio', // Radio button selection
      },
    },
    {
      name: 'images',
      type: 'array',
      title: 'All images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'subtitles',
      title: 'Subtitles',
      type: 'array',
      of: [{ type: 'string' }], // Array of strings
      description: 'Optional subtitles for images. Each subtitle corresponds to an image in the same order.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
