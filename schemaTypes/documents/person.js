// ============================================================================
// SCHEMA 2 — PESSOAS / COLABORADORES (person)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {getGlobalFooterField} from '../../utils/globalFooter'

function personImageField(config) {
  return defineField({
    name: config.name,
    title: config.title,
    description: config.description,
    type: 'image',
    group: ['general', 'media', 'social'],
    fieldset: config.fieldset,
    options: {
      hotspot: true,
    },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Texto Alternativo (Alt)',
        description: 'Descrição da imagem para acessibilidade e SEO.',
      },
    ],
  })
}

export default defineType({
  name: 'person',
  title: 'Pessoas / Colaboradores',
  type: 'document',

  groups: [
    {name: 'general', title: 'Informações Principais', default: true},
    {name: 'media', title: 'Mídia e Galeria'},
    {name: 'social', title: 'Contatos e Social'},
  ],

  fieldsets: [
    {name: 'identity', title: '📂 Dados de Identificação', options: {columns: 2}},
    {name: 'bios', title: '✍ Biografias e Textos', options: {columns: 1}},
    {name: 'portraits', title: '🖼️ Mídia', options: {columns: 2}},
    {name: 'gallery', title: '🎨 Galeria', options: {columns: 1}},
    {name: 'socialLinks', title: '🌐 Canais e Redes Sociais', options: {columns: 2}},
  ],

  fields: [
    // --- ABA 1: INFORMAÇÕES PRINCIPAIS ---
    defineField({
      name: 'name',
      title: 'Nome Completo / Artístico',
      type: 'string',
      group: ['general', 'media', 'social'],
      fieldset: 'identity',
      validation: (Rule) => Rule.required().error('O nome é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: ['general', 'media', 'social'],
      fieldset: 'identity',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('O slug é obrigatório para gerar o link da página.'),
    }),
    defineField({
      name: 'role',
      title: 'Especialidade / Cargo / Função',
      type: 'string',
      group: ['general', 'media', 'social'],
      fieldset: 'identity',
      description: 'Ex: Artista, Colaborador, Gerente.',
    }),
    defineField({
      name: 'location',
      title: 'Localização (Cidade / País)',
      type: 'string',
      group: ['general', 'media', 'social'],
      fieldset: 'identity',
      description: 'Ex: São Paulo, SP — Brasil',
    }),
    defineField({
      name: 'specialties',
      title: 'Lista de Estilos / Habilidades',
      type: 'array',
      group: ['general', 'media', 'social'],
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Adicione palavras-chave (pressione Enter após cada estilo, ex: Blackwork, Ornamental).',
    }),
    defineField({
      name: 'shortBio',
      title: 'Biografia Curta (Resumo)',
      type: 'text',
      rows: 3,
      group: ['general', 'media', 'social'],
      fieldset: 'bios',
      validation: (Rule) =>
        Rule.max(500).warning('Recomendado ter no máximo 500 caracteres para melhor encaixe em cards e listagens.'),
      description: 'Versão reduzida (máx. 500 caracteres) para introduções e cartões de apresentação.',
    }),
    defineField({
      name: 'bio',
      title: 'Biografia Longa (Completa)',
      type: 'array',
      of: [{type: 'block'}],
      group: ['general', 'media', 'social'],
      fieldset: 'bios',
      description: 'Texto completo e livre para a página de perfil individual do profissional.',
    }),

    // --- ABA 2: MÍDIA E GALERIA ---
    personImageField({
      name: 'profileImage',
      title: 'Foto de Perfil / Retrato',
      description: 'Sugestão de foto quadrada (1:1) - Recomendado: 1080x1080px. Use a ferramenta de corte (crop).',
      fieldset: 'portraits',
    }),
    personImageField({
      name: 'coverImage',
      title: 'Foto de Capa / Banner',
      description: 'Sugestão de formato horizontal (Ex: 1920x600px) para o topo do perfil.',
      fieldset: 'portraits',
    }),
    defineField({
      name: 'portfolioGallery',
      title: 'Galeria de Trabalhos em Destaque',
      type: 'array',
      group: ['general', 'media', 'social'],
      fieldset: 'gallery',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo (Alt)',
              description: 'Descrição da obra para acessibilidade e SEO.',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      description: 'Selecione de 4 a 8 das melhores obras ou trabalhos representativos deste profissional.',
    }),

    // --- ABA 3: REDES SOCIAIS E CONTATOS ---
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      group: ['general', 'media', 'social'],
      fieldset: 'socialLinks',
      description: 'Link completo do perfil (ex: https://instagram.com/seuperfil)',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      group: ['general', 'media', 'social'],
      fieldset: 'socialLinks',
      description: 'Link completo do perfil (ex: https://tiktok.com/seuperfil)',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      group: ['general', 'media', 'social'],
      fieldset: 'socialLinks',
      description: 'Link completo do perfil (ex: https://youtube.com/seucanal)',
    }),
    defineField({
      name: 'email',
      title: 'E-mail de Contato / Orçamentos',
      type: 'email',
      group: ['general', 'media', 'social'],
      fieldset: 'socialLinks',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp / Telefone',
      type: 'string',
      group: ['general', 'media', 'social'],
      fieldset: 'socialLinks',
      description: 'Número com DDD ou link direto para contato.',
    }),
    defineField({
      name: 'externalWebsite',
      title: 'Site ou Portfólio Externo',
      type: 'url',
      group: ['general', 'media', 'social'],
      fieldset: 'socialLinks',
    }),

    // --- RODAPÉ GLOBAL LIMPO ---
    getGlobalFooterField(['general', 'media', 'social']),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Sem Nome',
        subtitle: subtitle || 'Colaborador sem cargo definido',
        media: media,
      }
    },
  },
})