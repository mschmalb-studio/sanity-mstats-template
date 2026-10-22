import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'supportAsset',
  title: '📁 Banco de Recursos & Mídias',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Recurso',
      description: 'Nome identificador (ex: Textura de Fundo Escura, Vídeo Hero Institucional, Copy de Promoção).',
      type: 'string',
      validation: (Rule) => Rule.required().error('O título é obrigatório.'),
    }),

    defineField({
      name: 'assetType',
      title: 'Tipo de Recurso',
      type: 'string',
      options: {
        list: [
          {title: '🖼️ Imagem / Textura / Fundo', value: 'image'},
          {title: '🎥 Vídeo / Animação', value: 'video'},
          {title: '📝 Texto de Apoio / Copy', value: 'text'},
          {title: '📄 Arquivo / Documento de Apoio', value: 'file'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Categoria / Tag',
      description: 'Ajuda a filtrar e organizar os recursos no painel.',
      type: 'string',
      options: {
        list: [
          {title: 'Backgrounds & Texturas', value: 'backgrounds'},
          {title: 'Campanhas & Promoções', value: 'campaigns'},
          {title: 'Elementos Visuais & Ícones', value: 'graphics'},
          {title: 'Copys & Rascunhos de Texto', value: 'copys'},
          {title: 'Outros', value: 'other'},
        ],
      },
    }),

    // --- CAMPOS DE MÍDIA E ARQUIVO ---
    defineField({
      name: 'imageAsset',
      title: 'Imagem ou Textura',
      type: 'image',
      options: {hotspot: true},
      hidden: ({document}) => document?.assetType !== 'image',
    }),

    defineField({
      name: 'fileAsset',
      title: 'Arquivo de Mídia / Vídeo / PDF',
      description: 'Faça upload de vídeos curtos, arquivos MP4, PDFs ou mídias diversas.',
      type: 'file',
      hidden: ({document}) => document?.assetType !== 'video' && document?.assetType !== 'file',
    }),

    defineField({
      name: 'externalUrl',
      title: 'URL Externa / Link do Vídeo (Opcional)',
      description: 'Link direto para vídeos no YouTube, Vimeo, Google Drive ou CDN externo.',
      type: 'url',
    }),

    // --- CAMPO DE TEXTO RICO ---
    defineField({
      name: 'textContent',
      title: 'Texto de Apoio / Conteúdo',
      description: 'Espaço para redigir textos bases, copys de anúncios, slogans ou notas.',
      type: 'array',
      of: [{type: 'block'}],
      hidden: ({document}) => document?.assetType !== 'text',
    }),

    defineField({
      name: 'notes',
      title: 'Observações de Uso',
      description: 'Anotações internas sobre onde ou como este recurso deve ser aplicado.',
      type: 'text',
      rows: 2,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'imageAsset',
      assetType: 'assetType',
    },
    prepare({title, subtitle, media, assetType}) {
      const icons = {
        image: '🖼️',
        video: '🎥',
        text: '📝',
        file: '📄',
      }
      return {
        title: `${icons[assetType] || '📁'} ${title}`,
        subtitle: subtitle ? `Categoria: ${subtitle}` : `Tipo: ${assetType}`,
        media: media,
      }
    },
  },
})