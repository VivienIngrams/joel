import { defineArrayMember, defineType } from 'sanity'

export default defineType({
    name: 'break',
    type: 'object',
    title: 'Break',
    fields: [
      {
        name: 'style',
        type: 'string',
        options: {
          list: ['break', 'readMore']
        }
      }
    ]
})