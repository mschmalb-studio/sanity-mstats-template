// ============================================================================
// SCHEMA — ÁLBUNS E GALERIAS (album)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'
import {getGlobalFooterField} from '../../utils/globalFooter'

export default defineType({
  name: 'album',
  title: 'Álbuns e Galerias',
  type: 'document',

  groups: [
    {name: 'general', title: 'Informações Básicas', default: true},
    {name: 'hierarchy', title: 'Hierarquia e Organização'},
    {name: 'rules', title: 'Filtros Automáticos (Ímãs)'},
    {name: 'manual', title: 'Curadoria Manual (Opcional)'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Título do Álbum / Galeria',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('O título do álbum é obrigatório.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Descrição Curta',
      type: 'string',
      group: 'general',
      description: 'Breve resumo exibido no topo do álbum ou em cards de navegação.',
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
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa do Álbum',
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

    // --- HIERARQUIA (ÁLBUM PAI / SUB-ÁLBUNS) ---
    defineField({
      name: 'parentAlbum',
      title: 'Álbum Pai (Hierarquia Superior)',
      type: 'reference',
      to: [{type: 'album'}],
      group: 'hierarchy',
      description: 'Deixe em branco se este for um álbum principal/raiz. Selecione um álbum caso este seja um sub-álbum (ex: Residências dentro de Arquitetura).',
      options: {
        // Filtro dinâmico seguro para evitar que o álbum aponte para si mesmo (cobre rascunhos e publicados)
        filter: ({document}) => {
          const documentId = document._id.replace(/^drafts\./, '')
          return {
            filter: '_id != $nativeId && _id != $draftId',
            params: {
              nativeId: documentId,
              draftId: `drafts.${documentId}`,
            },
          }
        },
      },
    }),

    // --- FILTROS AUTOMÁTICOS (ÍMÃS MÚLTIPLOS) ---
    defineField({
      name: 'filterCategories',
      title: 'Filtrar por Categorias (Ímãs Múltiplos)',
      type: 'array',
      group: 'rules',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
      description: 'Selecione uma ou mais categorias para este álbum puxar projetos automaticamente (ex: Residencial e Comercial para o álbum Arquitetura).',
    }),
    defineField({
      name: 'filterTags',
      title: 'Filtrar por Tags (Palavras-chave)',
      type: 'array',
      of: [{type: 'string'}],
      group: 'rules',
      options: {
        layout: 'tags',
      },
      description: 'Insira tags correspondentes (ex: 2026, destaque). O álbum trará projetos das categorias acima que contenham estas tags.',
    }),

    // --- CURADORIA MANUAL ---
    defineField({
      name: 'manualProjects',
      title: 'Projetos Adicionados Manualmente',
      type: 'array',
      group: 'manual',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
      description: 'Use esta lista para forçar a inclusão ou ordenação manual de projetos específicos.',
    }),

    // --- CONTEÚDO / DESCRIÇÃO LONGA ---
    defineField({
      name: 'body',
      title: 'Texto Descritivo do Álbum (Opcional)',
      type: 'array',
      of: [{type: 'block'}],
      group: 'general',
      description: 'Texto introdutório para galerias.',
    }),

    // --- RODAPÉ GLOBAL ---
    getGlobalFooterField(['general', 'hierarchy', 'rules', 'manual']),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'coverImage',
      parentTitle: 'parentAlbum.title',
    },
    prepare(selection) {
      const {title, subtitle, media, parentTitle} = selection
      const hierarchyInfo = parentTitle ? `Sub-álbum de: ${parentTitle}` : 'Álbum Principal'
      return {
        title: title || 'Álbum sem Título',
        subtitle: subtitle ? `${hierarchyInfo} | ${subtitle}` : hierarchyInfo,
        media: media,
      }
    },
  },
})