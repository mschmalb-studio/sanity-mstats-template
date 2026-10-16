// ============================================================================
// SCHEMA — PERGUNTAS FREQUENTES / FAQ (faq)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {getGlobalFooterField} from '../../utils/globalFooter'

export default defineType({
  name: 'faq',
  title: 'Perguntas Frequentes (FAQ)',
  type: 'document',
  
  // Adiciona a ordenação padrão do plugin de arrastar e soltar
  orderings: [orderRankOrdering],

  groups: [
    {name: 'general', title: 'Informações Básicas', default: true},
    {name: 'answerGroup', title: 'Resposta'},
  ],

  fields: [
    // Campo oculto que gerencia a posição do arrastar e soltar nos bastidores
    orderRankField({type: 'faq'}),

    defineField({
      name: 'question',
      title: 'Pergunta',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('A pergunta é obrigatória.'),
    }),
    defineField({
      name: 'category',
      title: 'Categoria / Tópico (Opcional)',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'general',
      description: 'Associe a uma categoria para filtrar perguntas por seção no site.',
    }),
    defineField({
      name: 'answer',
      title: 'Resposta Detalhada',
      type: 'array',
      group: 'answerGroup',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().error('A resposta é obrigatória.'),
      description: 'Explicação detalhada para a dúvida frequente.',
    }),

    // --- RODAPÉ GLOBAL ---
    getGlobalFooterField(['general', 'answerGroup']),
  ],

  preview: {
    select: {
      title: 'question',
      subtitle: 'category.title',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Pergunta sem título',
        subtitle: subtitle ? `Categoria: ${subtitle}` : 'FAQ Geral',
      }
    },
  },
})