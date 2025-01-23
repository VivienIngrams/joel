import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'videoPage',
    title: 'Page Vidéos',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Titre de la page',
        type: 'string',
      },
      {
        name: 'videos',
        title: 'Vidéos',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Titre vidéo',
                type: 'string',
              },
              {
                name: 'youtubeUrl',
                title: 'YouTube URL (copier adresse de la page du vidéo sur Youtube et coller ici)',
                type: 'string',
              }
            ],
            preview: {
              select: {
                title: 'title',
                media: 'youtubeUrl'
              },
            
            }
          }
        ]
      }
    ]
  })
  