// ============================================================================
// SCHEMA — AGENDA / EVENTOS / WORKSHOPS (event)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import { getGlobalFooterField } from "../../utils/globalFooter";

export default defineType({
  name: 'event',
  title: 'Agenda & Eventos',
  type: 'document',

  orderings: [orderRankOrdering],

  groups: [
    {name: 'general', title: 'Informações Básicas', default: true},
    {name: 'schedule', title: 'Data, Horário & Local'},
    {name: 'media', title: 'Mídia & Inscrição'},
  ],

  fields: [
    orderRankField({type: 'event'}),

    defineField({
      name: 'title',
      title: 'Título do Evento',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('O título do evento é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Amigável)',
      type: 'slug',
      group: 'general',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria do Evento',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'general',
      description: 'Ex: Flash Day, Workshop, Exposição, Live.',
    }),
    defineField({
      name: 'description',
      title: 'Descrição Completa',
      type: 'array',
      group: 'general',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    }),

    // --- DATA, HORÁRIO E LOCAL ---
    defineField({
      name: 'startDate',
      title: 'Data e Hora de Início',
      type: 'datetime',
      group: 'schedule',
      validation: (Rule) => Rule.required(),
      options: {dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm'},
    }),
    defineField({
      name: 'endDate',
      title: 'Data e Hora de Término',
      type: 'datetime',
      group: 'schedule',
      options: {dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm'},
    }),
    defineField({
      name: 'locationType',
      title: 'Tipo de Local',
      type: 'string',
      group: 'schedule',
      options: {
        list: [
          {title: 'Presencial', value: 'onsite'},
          {title: 'Online / Transmissão', value: 'online'},
        ],
      },
      initialValue: 'onsite',
    }),
    defineField({
      name: 'addressOrLink',
      title: 'Endereço Físico ou Link da Transmissão',
      type: 'string',
      group: 'schedule',
    }),

    // --- MÍDIA E INSCRIÇÃO ---
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
    }),
    defineField({
      name: 'maxAttendees',
      title: 'Número Máximo de Vagas (Opcional)',
      type: 'number',
      group: 'media',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Link Externo para Inscrição / Ingressos',
      type: 'url',
      group: 'media',
      description: 'Se houver uma plataforma externa de venda ou formulário.',
    }),

    getGlobalFooterField(['general', 'schedule', 'media']),
  ],

  preview: {
    select: {
      title: 'title',
      date: 'startDate',
      media: 'coverImage',
      category: 'category.title',
    },
    prepare(selection) {
      const {title, date, media, category} = selection
      const formattedDate = date ? new Date(date).toLocaleDateString('pt-BR') : 'Data a definir'
      return {
        title: title || 'Evento sem título',
        subtitle: `${formattedDate} ${category ? `• [${category}]` : ''}`,
        media: media,
      }
    },
  },
})