// ============================================================================
// SCHEMA — DEPOIMENTOS / AVALIAÇÕES (testimonial)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {getGlobalFooterField} from '../../utils/globalFooter'

export default defineType({
  name: 'testimonial',
  title: 'Depoimentos / Avaliações',
  type: 'document',

  orderings: [orderRankOrdering],

  groups: [
    {name: 'guide', title: '💡 Instruções', default: true},
    {name: 'general', title: 'Dados do Depoimento'},
    {name: 'author', title: 'Autor & Imagem'},
  ],

  fields: [
    // --- NOTA EXPLICATIVA NO TOPO (GUIA PARA O USUÁRIO) ---
    defineField({
      name: 'instructionNote',
      title: 'Nota Explicativa',
      type: 'string',
      group: 'guide',
      readOnly: true,
      initialValue: 'ℹ️ Dica: Embora avaliações externas (como o Google) tragam forte credibilidade, você pode cadastrar depoimentos manuais aqui para exibi-los em destaque no site. Use o arrastar e soltar na lista para ordenar a prioridade!',
    }),

    // Campo oculto de ordenação por drag-and-drop
    orderRankField({type: 'testimonial'}),

    defineField({
      name: 'quote',
      title: 'Citação / Texto do Depoimento',
      type: 'text',
      rows: 4,
      group: 'general',
      validation: (Rule) => Rule.required().error('O texto do depoimento é obrigatório.'),
      description: 'O que o cliente ou parceiro disse.',
    }),
    defineField({
      name: 'rating',
      title: 'Nota / Avaliação (1 a 5 estrelas)',
      type: 'number',
      group: 'general',
      options: {
        list: [
          {title: '⭐ 1 Estrela', value: 1},
          {title: '⭐⭐ 2 Estrelas', value: 2},
          {title: '⭐⭐⭐ 3 Estrelas', value: 3},
          {title: '⭐⭐⭐⭐ 4 Estrelas', value: 4},
          {title: '⭐⭐⭐⭐⭐ 5 Estrelas', value: 5},
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'highlight',
      title: 'Destacar na Página Inicial?',
      type: 'boolean',
      group: 'general',
      description: 'Marque para exibir este depoimento nas seçōes de maior visibilidade.',
      initialValue: false,
    }),

    // --- AUTOR ---
    defineField({
      name: 'authorName',
      title: 'Nome do Autor',
      type: 'string',
      group: 'author',
      validation: (Rule) => Rule.required().error('O nome do autor é obrigatório.'),
    }),
    defineField({
      name: 'authorRole',
      title: 'Cargo / Vínculo (Ex: Cliente de Tatuagem, Aluno)',
      type: 'string',
      group: 'author',
    }),
    defineField({
      name: 'avatar',
      title: 'Foto / Avatar do Autor',
      type: 'image',
      group: 'author',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt)',
        },
      ],
    }),

    // --- RODAPÉ GLOBAL ---
    getGlobalFooterField(['guide', 'general', 'author']),
  ],

  preview: {
    select: {
      title: 'authorName',
      subtitle: 'quote',
      media: 'avatar',
      rating: 'rating',
    },
    prepare(selection) {
      const {title, subtitle, media, rating} = selection
      const stars = rating ? '★'.repeat(rating) : ''
      return {
        title: `${title || 'Anônimo'} ${stars}`,
        subtitle: subtitle ? `"${subtitle.substring(0, 50)}..."` : 'Sem texto',
        media: media,
      }
    },
  },
})