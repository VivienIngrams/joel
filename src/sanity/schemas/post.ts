import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre (French)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'excerpt_en',
      title: 'Excerpt (English)',
      type: 'blockContent',
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait (Français)',
      type: 'blockContent',
    }),
    {
      name: 'mainImages',
      type: 'array',
      title: 'Image(s) for Post Page',
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
      title: 'All Images',
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
      media: 'mainImages.0', // Preview the first image
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
