// ============================================================================
// SCHEMA — PROJETO / OBRA / ELEMENTO (project)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {getGlobalFooterField} from '../../utils/globalFooter'

export default defineType({
  name: 'project',
  title: 'Projetos / Elementos',
  type: 'document',

  groups: [
    {name: 'general', title: 'Informações Básicas', default: true},
    {name: 'classification', title: 'Classificação e Autoria'},
    {name: 'media', title: 'Mídia e Galeria'},
    {name: 'content', title: 'Detalhes'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Título do Elemento / Obra',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('O título é obrigatório.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Resumo Curto',
      type: 'string',
      group: 'general',
      description: 'Texto de apoio ou subtítulo exibido abaixo do título principal.',
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
    
    // --- CLASSIFICAÇÃO E AUTORIA ---
    defineField({
      name: 'category',
      title: 'Categoria Principal (Filtro Rígido)',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'classification',
      validation: (Rule) => Rule.required().error('Selecione uma categoria para evitar vazamentos de dados.'),
      description: 'Define a macro-categoria deste item (ex: Pintura, Escultura, Curso, Projeto).',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Palavras-chave (Filtro Flexível)',
      type: 'array',
      of: [{type: 'string'}],
      group: 'classification',
      options: {
        layout: 'tags',
      },
      description: 'Insira palavras-chave livres para cruzamentos (ex: 2026, destaque, serie-azul).',
    }),
    defineField({
      name: 'authorReference',
      title: 'Autor / Responsável (Colaborador da Casa)',
      type: 'reference',
      to: [{type: 'person'}],
      group: 'classification',
      description: 'Opcional: Vincule a uma pessoa já cadastrada na aba "Pessoas / Colaboradores".',
    }),
    defineField({
      name: 'authorExternalName',
      title: 'Autor / Responsável (Nome Externo / Convidado)',
      type: 'string',
      group: 'classification',
      description: 'Use este campo caso o autor não seja um colaborador fixo cadastrado (ex: Artista Convidado).',
    }),

    // --- MÍDIA E GALERIA ---
    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa / Destaque',
      type: 'image',
      group: 'media',
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
    defineField({
      name: 'gallery',
      title: 'Carrossel / Galeria de Detalhes',
      type: 'array',
      group: 'media',
      of: [
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
              title: 'Legenda da Foto',
            },
          ],
        },
      ],
      description: 'Adicione múltiplas fotos ou ângulos para exibir nos detalhes do elemento.',
    }),

    // --- CONTEÚDO ---
    defineField({
      name: 'body',
      title: 'Descrição Completa',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
      description: 'Texto detalhado sobre o elemento, ficha técnica, história ou especificações.',
    }),

    // --- RODAPÉ GLOBAL ---
    getGlobalFooterField(['general', 'classification', 'media', 'content']),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      category: 'category.title',
      external: 'authorExternalName',
      internal: 'authorReference.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, category, external, internal, media} = selection
      const author = internal || external || 'Sem autor'
      return {
        title: title || 'Elemento sem Título',
        subtitle: `${category || 'Sem categoria'} | Por: ${author}`,
        media: media,
      }
    },
  },
})