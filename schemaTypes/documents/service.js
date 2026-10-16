// ============================================================================
// SCHEMA — SERVIÇOS / OFERTAS (service)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {getGlobalFooterField} from '../../utils/globalFooter' // <--- 1. Importar aqui no topo

export default defineType({
  name: 'service',
  title: 'Serviços / Ofertas',
  type: 'document',

  groups: [
    {name: 'general', title: 'Informações Básicas', default: true},
    {name: 'content', title: 'Conteúdo Detalhado'},
    {name: 'action', title: 'Ação e Destaque'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Nome do Serviço / Oferta',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('O título do serviço é obrigatório.'),
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
      validation: (Rule) => Rule.required().error('O slug é obrigatório para gerar o link.'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Resumo / Subtítulo (Para Cards)',
      type: 'text',
      rows: 2,
      group: 'general',
      description: 'Breve descrição de impacto exibida na listagem de serviços do site.',
    }),
    defineField({
      name: 'image',
      title: 'Imagem de Capa / Ilustração',
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
    }),
    defineField({
      name: 'body',
      title: 'Descrição Completa',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
      description: 'Texto detalhado com o que o serviço inclui, metodologia, etapas ou prazos.',
    }),
    defineField({
      name: 'featured',
      title: 'Destacar na Página Inicial?',
      type: 'boolean',
      group: 'action',
      initialValue: false,
      description: 'Ative se este serviço deve aparecer em evidência na Home.',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto do Botão de Ação (Opcional)',
      type: 'string',
      group: 'action',
      description: 'Ex: "Contratar", "Inscreva-se", "Quero Saber Mais".',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link de Destino do Botão',
      type: 'string',
      group: 'action',
      description: 'Ex: /contato ou um link externo.',
    }),

    // --- RODAPÉ GLOBAL ---
    getGlobalFooterField(['general', 'content', 'action']), // <--- 2. Adicionar aqui no fim dos fields
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Serviço sem Título',
        subtitle: subtitle || 'Oferta cadastrada',
        media: media,
      }
    },
  },
})