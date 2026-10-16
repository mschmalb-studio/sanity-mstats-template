// ============================================================================
// SCHEMA — EMPRESA / INSTITUCIONAL (companySettings)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {getGlobalFooterField} from '../../utils/globalFooter'

export default defineType({
  name: 'companySettings',
  title: 'Empresa / Studio',
  type: 'document',

  groups: [
    {name: 'institutional', title: 'Apresentação', default: true},
    {name: 'location', title: 'Localização e Horários'},
    {name: 'contact', title: 'Canais Oficiais'},
  ],

  fieldsets: [
    {name: 'overview', title: '🏢 Dados Institucionais', options: {columns: 2}},
    {name: 'story', title: '✍ Sobre Nós / História', options: {columns: 1}},
    {name: 'addressDetails', title: '📍 Endereço e Mapa', options: {columns: 2}},
    {name: 'hours', title: '⏰ Funcionamento', options: {columns: 1}},
    {name: 'channels', title: '🌐 Redes e Contatos Gerais', options: {columns: 2}},
  ],

  fields: [
    // --- ABA 1: APRESENTAÇÃO E HISTÓRIA ---
    defineField({
      name: 'legalName',
      title: 'Razão Social / Nome Oficial',
      type: 'string',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'overview',
      validation: (Rule) => Rule.required().error('O nome oficial é obrigatório.'),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan / Frase de Impacto',
      type: 'string',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'overview',
    }),
    defineField({
      name: 'foundingYear',
      title: 'Ano de Fundação',
      type: 'string',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'overview',
    }),
    defineField({
      name: 'aboutText',
      title: 'História / Bio',
      type: 'array',
      of: [{type: 'block'}],
      group: ['institutional', 'location', 'contact'],
      fieldset: 'story',
      description: 'Texto institucional completo para a seção "Sobre Nós" do site.',
    }),
    defineField({
      name: 'environmentImage',
      title: 'Foto da Fachada / Ambiente Principal',
      type: 'image',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'story',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt)',
        },
      ],
      description: 'Foto representativa do espaço físico e texto para uso de tecnologias assistivas.',
    }),

    // --- ABA 2: LOCALIZAÇÃO E HORÁRIOS ---
    defineField({
      name: 'address',
      title: 'Endereço Físico (Rua, Número)',
      type: 'string',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'addressDetails',
      description: 'Ex: Av. Paulista, 1000 — Sala 1',
    }),
    defineField({
      name: 'cityStateZip',
      title: 'Cidade, Estado e CEP',
      type: 'string',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'addressDetails',
      description: 'Ex: São Paulo, SP — CEP 01222-333',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Link do Google Maps / Avaliações',
      type: 'url',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'addressDetails',
      description: 'Link direto para o perfil do Google Meu Negócio / Como Chegar / Avaliações.',
    }),
    defineField({
      name: 'openingHours',
      title: 'Horário de Funcionamento',
      type: 'text',
      rows: 3,
      group: ['institutional', 'location', 'contact'],
      fieldset: 'hours',
      description: 'Ex: Segunda a Sábado, das 10h às 20h (Atendimento com hora marcada).',
    }),

    // --- ABA 3: CANAIS OFICIAIS ---
    defineField({
      name: 'generalEmail',
      title: 'E-mail Comercial Principal',
      type: 'email',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'channels',
    }),
    defineField({
      name: 'generalPhone',
      title: 'Telefone / WhatsApp Comercial',
      type: 'string',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'channels',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Oficial',
      type: 'url',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'channels',
    }),
    defineField({
      name: 'googleReviewsLink',
      title: 'Link de Avaliações (Opcional)',
      type: 'url',
      group: ['institutional', 'location', 'contact'],
      fieldset: 'channels',
      description: 'Caso queira exibir um botão dedicado para os clientes avaliarem no Google.',
    }),

    // --- RODAPÉ GLOBAL LIMPO ---
    getGlobalFooterField(['institutional', 'location', 'contact']),
  ],

  preview: {
    select: {
      title: 'legalName',
      subtitle: 'tagline',
      media: 'environmentImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Empresa sem Nome',
        subtitle: subtitle || 'Dados Institucionais do Estúdio',
        media: media,
      }
    },
  },
})