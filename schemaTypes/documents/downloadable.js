// ============================================================================
// SCHEMA — MATERIAIS PARA DOWNLOAD / RECURSOS (downloadable)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {getGlobalFooterField} from '../../utils/globalFooter'

export default defineType({
  name: 'downloadable',
  title: 'Downloads & Materiais',
  type: 'document',

  groups: [
    {name: 'general', title: 'Informações do Arquivo', default: true},
    {name: 'fileGroup', title: 'Arquivo & Mídia'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Título do Material',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('O título do material é obrigatório.'),
    }),
    defineField({
      name: 'description',
      title: 'Descrição / Instruções',
      type: 'text',
      rows: 3,
      group: 'general',
      description: 'Breve explicação sobre o que contém este arquivo.',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'general',
      description: 'Classifique o tipo de material (ex: Manuais, Guias, E-books).',
    }),

    // --- ARQUIVO E CAPA ---
    defineField({
      name: 'fileAsset',
      title: 'Arquivo para Download (PDF, ZIP, Imagem, etc.)',
      type: 'file',
      group: 'fileGroup',
      validation: (Rule) => Rule.required().error('O arquivo para download é obrigatório.'),
      options: {
        storeOriginalFilename: true,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa / Miniatura (Opcional)',
      type: 'image',
      group: 'fileGroup',
      options: {hotspot: true},
      description: 'Capa ilustrativa para exibir em cards de download.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto do Botão de Download',
      type: 'string',
      group: 'fileGroup',
      initialValue: 'Baixar Material',
    }),

    // --- RODAPÉ GLOBAL ---
    getGlobalFooterField(['general', 'fileGroup']),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'coverImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Material sem título',
        subtitle: subtitle ? `Categoria: ${subtitle}` : 'Arquivo Geral',
        media: media,
      }
    },
  },
})