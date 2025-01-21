import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Projets',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre (Français)',
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
      title: 'Images pour la page Galeries (2 à 5)',
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
      title: 'Format image pour page Galeries',
      type: 'string',
      options: {
        list: [
          { title: 'Carré', value: 'square' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Paysage', value: 'landscape' },
          { title: 'Panorama', value: 'panorama' },
        ],
        layout: 'radio', // Radio button selection
      },
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images de la page individuelle du projet',
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
      title: 'Sous-titres',
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
