// ============================================================================
// SCHEMA — PÁGINAS FLEXÍVEIS / PAGE BUILDER (page)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {getGlobalFooterField} from '../../utils/globalFooter'

export default defineType({
  name: 'page',
  title: 'Páginas Modulares (Builder)',
  type: 'document',

  groups: [
    {name: 'general', title: 'Configurações da Página', default: true},
    {name: 'builder', title: 'Construtor de Blocos (Layout)'},
    {name: 'seo', title: 'SEO e Metadados'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('O título da página é obrigatório.'),
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
      validation: (Rule) => Rule.required().error('O slug é obrigatório (ex: /sobre, /parcerias).'),
    }),
    defineField({
      name: 'description',
      title: 'Breve Descrição / Resumo',
      type: 'text',
      rows: 2,
      group: 'general',
      description: 'Resumo interno ou para listagens.',
    }),

    // --- CONSTRUTOR DE BLOCOS (PAGE BUILDER) ---
    defineField({
      name: 'pageBuilder',
      title: 'Blocos de Conteúdo da Página',
      type: 'array',
      group: 'builder',
      description: 'Adicione, organize e reordene blocos para montar a estrutura visual desta página.',
      of: [
        // 1. Bloco Hero / Destaque de Abertura
        {
          type: 'object',
          name: 'heroBlock',
          title: 'Bloco: Hero (Destaque Principal)',
          fields: [
            defineField({name: 'title', title: 'Título Principal', type: 'string'}),
            defineField({name: 'subtitle', title: 'Subtítulo / Chamada', type: 'text', rows: 2}),
            defineField({
              name: 'backgroundImage',
              title: 'Imagem de Fundo / Destaque',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'ctaText',
              title: 'Texto do Botão (CTA)',
              type: 'string',
            }),
            defineField({
              name: 'ctaUrl',
              title: 'Link do Botão (URL ou caminho)',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'title', media: 'backgroundImage'},
            prepare({title, media}) {
              return {
                title: `[Hero] ${title || 'Sem título'}`,
                media,
              }
            },
          },
        },

        // 2. Bloco de Texto Rico / Manifesto
        {
          type: 'object',
          name: 'richTextBloc',
          title: 'Bloco: Texto / Manifesto Institucional',
          fields: [
            defineField({name: 'sectionTitle', title: 'Título da Seção (Opcional)', type: 'string'}),
            defineField({
              name: 'content',
              title: 'Conteúdo em Texto Rico',
              type: 'array',
              of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
            }),
          ],
          preview: {
            select: {title: 'sectionTitle'},
            prepare({title}) {
              return {title: `[Texto Rico] ${title || 'Seção de Texto'}`}
            },
          },
        },

        // 3. Bloco de Galeria / Projetos em Destaque
        {
          type: 'object',
          name: 'projectsGridBlock',
          title: 'Bloco: Grade de Projetos / Obras',
          fields: [
            defineField({name: 'heading', title: 'Título da Seção', type: 'string'}),
            defineField({
              name: 'layoutStyle',
              title: 'Estilo de Exibição',
              type: 'string',
              options: {
                list: [
                  {title: 'Grid Dinâmico (Mosaico)', value: 'grid'},
                  {title: 'Carrossel Horizontal', value: 'carousel'},
                ],
              },
              initialValue: 'grid',
            }),
            defineField({
              name: 'selectedProjects',
              title: 'Selecionar Projetos específicos (Opcional)',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'project'}]}],
              description: 'Se deixar vazio, o front-end pode puxar os mais recentes automaticamente.',
            }),
          ],
          preview: {
            select: {title: 'heading'},
            prepare({title}) {
              return {title: `[Grade de Projetos] ${title || 'Destaques'}`}
            },
          },
        },

        // 4. Bloco de FAQ / Perguntas Frequentes
        {
          type: 'object',
          name: 'faqBlock',
          title: 'Bloco: FAQ (Perguntas Frequentes)',
          fields: [
            defineField({name: 'heading', title: 'Título da Seção', type: 'string'}),
            defineField({
              name: 'selectedFaqs',
              title: 'Selecionar Perguntas Específicas',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'faq'}]}],
            }),
          ],
          preview: {
            select: {title: 'heading'},
            prepare({title}) {
              return {title: `[FAQ / Acordeão] ${title || 'Dúvidas'}`}
            },
          },
        },

        // 5. Bloco de Depoimentos
        {
          type: 'object',
          name: 'testimonialBlock',
          title: 'Bloco: Depoimentos / Avaliações',
          fields: [
            defineField({name: 'heading', title: 'Título da Seção', type: 'string'}),
            defineField({
              name: 'selectedTestimonials',
              title: 'Selecionar Depoimentos em Destaque',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'testimonial'}]}],
            }),
          ],
          preview: {
            select: {title: 'heading'},
            prepare({title}) {
              return {title: `[Depoimentos] ${title || 'Avaliações de Clientes'}`}
            },
          },
        },
      ],
    }),
    
        // 6. Bloco de Downloads / Recursos
        {
          type: 'object',
          name: 'downloadableBlock',
          title: 'Bloco: Grade de Downloads / Materiais',
          fields: [
            defineField({name: 'heading', title: 'Título da Seção', type: 'string'}),
            defineField({name: 'subheading', title: 'Subtítulo / Descrição da Seção', type: 'text', rows: 2}),
            defineField({
              name: 'selectedDownloads',
              title: 'Selecionar Materiais para Exibir',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'downloadable'}]}],
              description: 'Escolha quais arquivos cadastrados aparecerão nesta seção.',
            }),
          ],
          preview: {
            select: {title: 'heading'},
            prepare({title}) {
              return {title: `[Downloads] ${title || 'Seção de Arquivos'}`}
            },
          },
        },

    // --- SEO E METADADOS ---
    defineField({
      name: 'seoTitle',
      title: 'Título SEO (Meta Title)',
      type: 'string',
      group: 'seo',
      description: 'Título exibido nas abas do navegador e no Google (máx. 60 caracteres).',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descrição SEO (Meta Description)',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Resumo exibido nos resultados de busca do Google (máx. 160 caracteres).',
    }),

    // --- RODAPÉ GLOBAL ---
    getGlobalFooterField(['general', 'builder', 'seo']),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare(selection) {
      const {title, slug} = selection
      return {
        title: title || 'Página sem Título',
        subtitle: slug ? `/${slug}` : 'Sem URL definida',
      }
    },
  },
})