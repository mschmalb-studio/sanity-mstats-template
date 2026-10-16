// ============================================================================
// SCHEMA 1 — IDENTIDADE VISUAL (brandSettings)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {
  HeadingFontInput,
  SubheadingFontInput,
  BodyFontInput,
} from '../../components/FontSelectorInput'
import {getGlobalFooterField} from '../../utils/globalFooter'

function imageField(config) {
  return defineField({
    name: config.name,
    title: config.title,
    description: config.description,
    type: 'image',
    group: ['media', 'colors', 'typography'],
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
    validation: config.validation,
  })
}

function colorField(config) {
  return defineField({
    name: config.name,
    title: config.title,
    description: config.description,
    type: 'color',
    group: ['media', 'colors', 'typography'],
    fieldset: 'palette',
    options: {
      disableAlpha: true,
    },
  })
}

export default defineType({
  name: 'brandSettings',
  title: 'Identidade Visual',
  type: 'document',

  groups: [
    {name: 'media', title: 'Logotipos e Ícones', default: true},
    {name: 'colors', title: 'Paleta de Cores'},
    {name: 'typography', title: 'Tipografia'},
  ],

  fieldsets: [
    {name: 'logos', title: '📂 Logotipos Principais (Header / Footer)', options: {columns: 2}},
    {name: 'icons', title: '📂 Ícones e Símbolos Reduzidos', options: {columns: 2}},
    {name: 'browser', title: '📂 Configuração de Navegador', options: {columns: 1}},
    {name: 'palette', title: '🎨 Kit de Cores da Marca (Padrão Sólido)', options: {columns: 3}},
    {name: 'typeGroup', title: '✍ Hierarquia Tipográfica', options: {columns: 1}},
  ],

  fields: [
    // --- BLOCO 1: MÍDIA ---
    imageField({
      name: 'logoMain',
      title: 'Logo Principal',
      description: 'Versão principal para fundos claros.',
      fieldset: 'logos',
    }),
    imageField({
      name: 'logoSecondary',
      title: 'Logo Secundária',
      description: 'Versão adaptada para fundos escuros.',
      fieldset: 'logos',
    }),
    imageField({
      name: 'iconMain',
      title: 'Ícone / Símbolo',
      description: 'Símbolo isolado da marca.',
      fieldset: 'icons',
    }),
    imageField({
      name: 'iconSecondary',
      title: 'Ícone (Versão Clara)',
      description: 'Símbolo adaptado para fundos escuros.',
      fieldset: 'icons',
    }),

    defineField({
      name: 'favicon',
      title: 'Favicon do Site',
      description: 'Ícone da aba do navegador. Envie uma imagem quadrada (ex: 512x512px).',
      type: 'image',
      group: ['media', 'colors', 'typography'],
      fieldset: 'browser',
      options: {hotspot: true},
    }),

    // --- BLOCO 2: CORES ---
    colorField({
      name: 'colorPrimary',
      title: 'Cor Primária',
      description: 'Principal (#111111)',
    }),
    colorField({
      name: 'colorSecondary',
      title: 'Cor Secundária',
      description: 'Fundo (#F9F9F8)',
    }),
    colorField({
      name: 'colorAccent',
      title: 'Cor de Destaque',
      description: 'Apoio (#666666)',
    }),

    // --- BLOCO 3: TIPOGRAFIA ---
    defineField({
      name: 'fontHeading',
      title: 'Fonte dos Títulos',
      type: 'string',
      group: ['media', 'colors', 'typography'],
      components: {
        input: HeadingFontInput,
      },
    }),
    defineField({
      name: 'fontSubheading',
      title: 'Fonte dos Subtítulos',
      type: 'string',
      group: ['media', 'colors', 'typography'],
      components: {
        input: SubheadingFontInput,
      },
    }),
    defineField({
      name: 'fontBody',
      title: 'Fonte do Corpo de Texto',
      type: 'string',
      group: ['media', 'colors', 'typography'],
      components: {
        input: BodyFontInput,
      },
    }),

    // --- RODAPÉ GLOBAL LIMPO ---
    getGlobalFooterField(['media', 'colors', 'typography']),
  ],

  preview: {
    prepare: () => ({title: 'Identidade Visual'}),
  },
})