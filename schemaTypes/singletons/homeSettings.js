// ============================================================================
// SCHEMA — PÁGINA INICIAL / HERO SECTION (homeSettings)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {getGlobalFooterField} from '../../utils/globalFooter'

export default defineType({
  name: 'homeSettings',
  title: 'Página Inicial (Hero)',
  type: 'document',

  groups: [
    {name: 'hero', title: 'Dobra Principal (Hero)', default: true},
    {name: 'media', title: 'Mídia e Atmosfera (Imagem/Vídeo/Áudio)'},
    {name: 'cta', title: 'Botões de Ação (CTAs)'},
  ],

  fieldsets: [
    {name: 'titleGroup', title: '✍ Título Principal (Opcional)', options: {columns: 1}},
    {name: 'subtitleGroup', title: '📄 Subtítulo de Apoio (Opcional)', options: {columns: 1}},
    {name: 'bgGroup', title: '🖼 Mídia de Fundo (Flexível)', options: {columns: 1}},
    {name: 'ctaPrimary', title: 'Botão Principal (CTA 1)', options: {columns: 2}},
    {name: 'ctaSecondary', title: 'Botão Secundário (CTA 2 - Opcional)', options: {columns: 2}},
    {name: 'audioGroup', title: '🎵 Atmosfera Sonora (Áudio)', options: {columns: 1}},
  ],

  fields: [
    // --- ABA 1: DOBRA PRINCIPAL (HERO) ---
    defineField({
      name: 'titleLine1',
      title: 'Título - Linha 1',
      type: 'string',
      group: 'hero',
      fieldset: 'titleGroup',
      description: 'Será ignorada pelo front-end se deixada vazia, sem criar espaço extra.',
    }),
    defineField({
      name: 'titleLine2',
      title: 'Título - Linha 2',
      type: 'string',
      group: 'hero',
      fieldset: 'titleGroup',
      description: 'Será ignorada pelo front-end se deixada vazia, sem criar espaço extra.',
    }),
    defineField({
      name: 'subtitleLine1',
      title: 'Subtítulo - Linha 1',
      type: 'string',
      group: 'hero',
      fieldset: 'subtitleGroup',
      description: 'Será ignorada pelo front-end se deixada vazia, sem criar espaço extra.',
    }),
    defineField({
      name: 'subtitleLine2',
      title: 'Subtítulo - Linha 2',
      type: 'string',
      group: 'hero',
      fieldset: 'subtitleGroup',
      description: 'Será ignorada pelo front-end se deixada vazia, sem criar espaço extra.',
    }),

    // --- ABA 2: MÍDIA E ATMOSFERA (Fundo e Áudio) ---
    defineField({
      name: 'heroImage',
      title: 'Imagem de Fundo / Fallback para Mobile',
      type: 'image',
      group: 'media',
      fieldset: 'bgGroup',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt)',
        },
      ],
      description: 'Usada como fundo principal ou como imagem de suporte em celulares onde vídeos são desativados.',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Link de Vídeo Externo (YouTube / Vimeo)',
      type: 'url',
      group: 'media',
      fieldset: 'bgGroup',
      description: 'Opcional. Caso prefira usar um link externo para o vídeo de fundo.',
    }),
    defineField({
      name: 'heroVideoFile',
      title: 'Arquivo de Vídeo de Fundo (MP4/WebM)',
      type: 'file',
      group: 'media',
      fieldset: 'bgGroup',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Opcional. Envie um arquivo de vídeo leve em loop para o fundo da Hero.',
    }),
    defineField({
      name: 'ambientAudioUrl',
      title: 'Link da Playlist / Streaming (Spotify, YouTube Music, etc.)',
      type: 'url',
      group: 'media',
      fieldset: 'audioGroup',
      description: 'Link opcional para alimentar o player de áudio interativo do front-end (atmosfera do estúdio).',
    }),

    // --- ABA 3: BOTÕES DE AÇÃO (CTAs) ---
    defineField({
      name: 'ctaPrimaryText',
      title: 'Texto do Botão Principal',
      type: 'string',
      group: 'cta',
      fieldset: 'ctaPrimary',
      description: 'Ex: "Agende seu horário" ou "Explorar portfólio".',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'Link de Destino (Principal)',
      type: 'string',
      group: 'cta',
      fieldset: 'ctaPrimary',
      description: 'Ex: /contato ou link direto do WhatsApp.',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'Texto do Botão Secundário',
      type: 'string',
      group: 'cta',
      fieldset: 'ctaSecondary',
      description: 'Ex: "Conheça os Artistas" ou "Nossa História".',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'Link de Destino (Secundário)',
      type: 'string',
      group: 'cta',
      fieldset: 'ctaSecondary',
      description: 'Ex: /equipe ou /sobre.',
    }),

    // --- RODAPÉ GLOBAL LIMPO ---
    getGlobalFooterField(['hero', 'media', 'cta']),
  ],

  preview: {
    select: {
      title: 'titleLine1',
      subtitle: 'titleLine2',
      media: 'heroImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Página Inicial (Hero Flexível)',
        subtitle: subtitle ? `${title} / ${subtitle}` : 'Configuração da Dobra Principal',
        media: media,
      }
    },
  },
})