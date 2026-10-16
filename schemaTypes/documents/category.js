// ============================================================================
// SCHEMA — CATEGORIAS (category)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categorias',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Nome da Categoria',
      type: 'string',
      validation: (Rule) => Rule.required().error('O nome da categoria é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Amigável)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('O slug é obrigatório.'),
    }),
    defineField({
      name: 'description',
      title: 'Descrição (Opcional)',
      type: 'text',
      rows: 2,
      description: 'Breve resumo sobre o escopo desta categoria.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Categoria sem Título',
        subtitle: subtitle || 'Categoria de classificação',
      }
    },
  },
})