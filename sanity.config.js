import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorInput} from '@sanity/color-input'
import {ptBRLocale} from '@sanity/locale-pt-br'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// Injeção elegante das fontes do Google Fonts com múltiplos pesos no Head do Sanity Studio
if (typeof document !== 'undefined') {
  const linkId = 'google-fonts-studio-preview'
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link')
    link.id = linkId
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700;800;900&family=Lato:wght@400;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Prata&family=Source+Sans+3:wght@400;600;700&display=swap'
    document.head.appendChild(link)
  }
}

export default defineConfig({
  name: 'default',
  title: 'Sanity Template',

  projectId: '86xipl79',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Conteúdo do Estúdio')
          .items([

            S.listItem()
      .title('📖 Guia de Uso do Studio')
      .child(
        S.document()
          .schemaType('studioGuide')
          .documentId('studioGuideSingleton')
      ),

          S.divider(),

            // 1. Identidade Visual (Singleton)
            S.listItem()
              .title('Identidade Visual')
              .id('brandSettings')
              .child(
                S.document()
                  .schemaType('brandSettings')
                  .documentId('brandSettings')
              ),

            // 2. Página Inicial / Hero (Singleton)
            S.listItem()
              .title('Página Inicial')
              .id('homeSettings')
              .child(
                S.document()
                  .schemaType('homeSettings')
                  .documentId('homeSettings')
              ),

            // 3. Empresa / Institucional (Singleton)
            S.listItem()
              .title('Empresa / Studio')
              .id('companySettings')
              .child(
                S.document()
                  .schemaType('companySettings')
                  .documentId('companySettings')
              ),
            
            // 4. Serviços / Ofertas (Lista)
            S.listItem()
              .title('Serviços / Ofertas')
              .schemaType('service')
              .child(
                S.documentTypeList('service').title('Serviços')
              ),

            S.divider(),

            // 5. Pessoas / Colaboradores (Lista)
            S.listItem()
              .title('Pessoas / Colaboradores')
              .schemaType('person')
              .child(S.documentTypeList('person').title('Colaboradores')),

            S.divider(),

            // 6. Categorias (Lista)
            S.listItem()
              .title('Categorias')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Categorias')),

            // 7. Projetos / Elementos (Lista)
            S.listItem()
              .title('Projetos / Elementos')
              .schemaType('project')
              .child(S.documentTypeList('project').title('Projetos e Obras')),

            // 8. Álbuns e Galerias (Lista)
            S.listItem()
              .title('Álbuns e Galerias')
              .schemaType('album')
              .child(S.documentTypeList('album').title('Álbuns e Galerias')),

            S.divider(),  

            // 9. Blog / Artigos (Lista)
            S.listItem()
              .title('Blog / Artigos')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Artigos do Blog')),

            S.divider(),

            // 10. FAQ COM SUPORTE A DRAG-AND-DROP
            orderableDocumentListDeskItem({
              type: 'faq',
              title: 'FAQ / Ajuda (Ordenável)',
              S,
              context,
            }),

            // 11. Depoimentos (Ordenável)
            orderableDocumentListDeskItem({
              type: 'testimonial',
              title: 'Depoimentos / Avaliações',
              S,
              context,
            }),

            // 12. Agenda e Eventos (Ordenável)
            orderableDocumentListDeskItem({
              type: 'event',
              title: 'Agenda & Eventos',
              S,
              context,
            }),

            // 13. Construtor de Formulários (Lista)
            S.listItem()
              .title('Formulários Dinâmicos')
              .schemaType('formBuilder')
              .child(S.documentTypeList('formBuilder').title('Gerenciar Formulários')),

            // 14. Downloads e Materiais (Lista)
            S.listItem()
              .title('Downloads & Materiais')
              .schemaType('downloadable')
              .child(S.documentTypeList('downloadable').title('Gerenciar Downloads')), 

             S.divider(),

            // 15. Páginas Modulares (Lista)
            S.listItem()
              .title('Páginas Modulares')
              .schemaType('page')
              .child(S.documentTypeList('page').title('Páginas do Site')),

              S.divider(),
              
            // 16. Respostas / Submissões de Formulários (Lista)
            S.listItem()
              .title('Respostas Recebidas (formulários)')
              .schemaType('formSubmission')
              .child(S.documentTypeList('formSubmission').title('Leads & Submissões')),
              
              S.divider(),

              // Banco de Recursos & Mídias (Lista)
            S.listItem()
              .title('Banco de Recursos')
              .schemaType('supportAsset')
              .child(S.documentTypeList('supportAsset').title('Recursos & Mídias de Apoio')),

            S.divider(),

          ]),
    }),
    visionTool(),
    colorInput(),
    ptBRLocale(),
  ],

  schema: {
    types: schemaTypes,
  },
})