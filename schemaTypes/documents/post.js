// ============================================================================
// SCHEMA — BLOG / ARTIGOS (post)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {getGlobalFooterField} from '../../utils/globalFooter'

export default defineType({
  name: 'post',
  title: 'Blog / Artigos',
  type: 'document',

  groups: [
    {name: 'general', title: 'Informações Básicas', default: true},
    {name: 'content', title: 'Conteúdo do Artigo'},
    {name: 'meta', title: 'Publicação e Autoria'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Título do Artigo',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('O título do artigo é obrigatório.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Resumo Curto',
      type: 'text',
      rows: 2,
      group: 'general',
      description: 'Breve introdução exibida em listagens e cards do blog.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Amigável)',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('O slug é obrigatório.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa',
      type: 'image',
      group: 'general',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt)',
        },
      ],
      validation: (Rule) => Rule.required().error('A imagem de capa é obrigatória.'),
    }),

    // --- CONTEÚDO ---
    defineField({
      name: 'body',
      title: 'Corpo do Artigo',
      type: 'array',
      group: 'content',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo (Alt)',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda da Imagem',
            },
          ],
        },
      ],
      description: 'Escreva o artigo utilizando formatações, subtítulos e imagens de apoio.',
    }),

    // --- PUBLICAÇÃO E AUTORIA ---
    defineField({
      name: 'author',
      title: 'Autor do Artigo',
      type: 'reference',
      to: [{type: 'person'}],
      group: 'meta',
      description: 'Selecione quem escreveu este artigo a partir da lista de Pessoas.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      group: 'meta',
      validation: (Rule) => Rule.required().error('A data de publicação é obrigatória.'),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'categories',
      title: 'Categorias do Artigo',
      type: 'array',
      group: 'meta',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      description: 'Associe o artigo às categorias do site.',
    }),

    // --- RODAPÉ GLOBAL ---
    getGlobalFooterField(['general', 'content', 'meta']),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const {title, author, media, date} = selection
      const formattedDate = date ? new Date(date).toLocaleDateString('pt-BR') : 'Rascunho'
      return {
        title: title || 'Artigo sem Título',
        subtitle: `${author ? `Por ${author} • ` : ''}${formattedDate}`,
        media: media,
      }
    },
  },
})