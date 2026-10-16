// ============================================================================
// SCHEMA — CONSTRUTOR DE FORMULÁRIOS DINÂMICOS (formBuilder)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'formBuilder',
  title: 'Construtor de Formulários',
  type: 'document',

  groups: [
    {name: 'general', title: 'Configuração Básica', default: true},
    {name: 'fieldsGroup', title: 'Campos do Formulário'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Título Interno do Formulário',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('O título interno é obrigatório.'),
      description: 'Ex: Formulário de Contato Principal, Orçamento de Serviços, Agendamento.',
    }),
    defineField({
      name: 'formId',
      title: 'Identificador Único (Slug / ID)',
      type: 'slug',
      group: 'general',
      options: {source: 'title', maxLength: 50},
      validation: (Rule) => Rule.required().error('O identificador é obrigatório para o front-end.'),
      description: 'Usado pelo front-end (ex: /contato, /orcamento) para buscar o formulário correto.',
    }),
    defineField({
      name: 'successMessage',
      title: 'Mensagem de Sucesso no Envio',
      type: 'text',
      rows: 2,
      group: 'general',
      initialValue: 'Mensagem enviada com sucesso! Retornaremos em breve.',
    }),

    // --- CAIXA DE FERRAMENTAS DO FORMULÁRIO (BUILDER) ---
    defineField({
      name: 'formFields',
      title: 'Campos do Formulário',
      type: 'array',
      group: 'fieldsGroup',
      description: 'Adicione, organize e configure os campos que aparecerão neste formulário.',
      of: [
        // 1. Campo de Texto Curto (Nome, E-mail, Telefone, etc.)
        {
          type: 'object',
          name: 'textField',
          title: 'Campo: Texto Curto',
          fields: [
            defineField({name: 'label', title: 'Rótulo do Campo (Label)', type: 'string', validation: (R) => R.required()}),
            defineField({name: 'placeholder', title: 'Texto de Exemplo (Placeholder)', type: 'string'}),
            defineField({
              name: 'inputType',
              title: 'Tipo de Dado',
              type: 'string',
              options: {
                list: [
                  {title: 'Texto Simples', value: 'text'},
                  {title: 'E-mail', value: 'email'},
                  {title: 'Telefone', value: 'tel'},
                ],
              },
              initialValue: 'text',
            }),
            defineField({name: 'required', title: 'Campo Obrigatório?', type: 'boolean', initialValue: true}),
          ],
          preview: {
            select: {title: 'label', type: 'inputType'},
            prepare({title, type}) {
              return {title: `[Texto: ${type || 'text'}] ${title || 'Sem título'}`}
            },
          },
        },

        // 2. Campo de Texto Longo (Mensagem, Descrição)
        {
          type: 'object',
          name: 'textareaField',
          title: 'Campo: Texto Longo / Mensagem',
          fields: [
            defineField({name: 'label', title: 'Rótulo do Campo (Label)', type: 'string', validation: (R) => R.required()}),
            defineField({name: 'placeholder', title: 'Texto de Exemplo', type: 'string'}),
            defineField({name: 'required', title: 'Campo Obrigatório?', type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {title: 'label'},
            prepare({title}) {
              return {title: `[Texto Longo] ${title || 'Sem título'}`}
            },
          },
        },

        // 3. Campo Inteligente: Seleção de Serviços (Puxa do CMS)
        {
          type: 'object',
          name: 'serviceSelectField',
          title: 'Campo Inteligente: Seleção de Serviços',
          fields: [
            defineField({name: 'label', title: 'Rótulo do Campo', type: 'string', initialValue: 'Selecione o Serviço Desejado'}),
            defineField({name: 'required', title: 'Obrigatório?', type: 'boolean', initialValue: true}),
          ],
          preview: {
            select: {title: 'label'},
            prepare({title}) {
              return {title: `[Seletor de Serviços do CMS] ${title}`}
            },
          },
        },

        // 4. Campo Inteligente: Seleção de Profissional / Equipe (Puxa do CMS)
        {
          type: 'object',
          name: 'personSelectField',
          title: 'Campo Inteligente: Seleção de Profissional',
          fields: [
            defineField({name: 'label', title: 'Rótulo do Campo', type: 'string', initialValue: 'Com quem deseja atendimento?'}),
            defineField({name: 'required', title: 'Obrigatório?', type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {title: 'label'},
            prepare({title}) {
              return {title: `[Seletor de Profissionais do CMS] ${title}`}
            },
          },
        },

        // 5. Campo de Opções Manuais (Ex: Turno, Tamanho, Categoria estática)
        {
          type: 'object',
          name: 'optionsField',
          title: 'Campo: Múltipla Escolha (Opções Customizadas)',
          fields: [
            defineField({name: 'label', title: 'Rótulo do Campo', type: 'string', validation: (R) => R.required()}),
            defineField({
              name: 'optionsList',
              title: 'Lista de Opções',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Digite cada opção e aperte Enter (ex: Manhã, Tarde, Noite).',
            }),
            defineField({name: 'required', title: 'Obrigatório?', type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {title: 'label'},
            prepare({title}) {
              return {title: `[Opções] ${title || 'Sem título'}`}
            },
          },
        },

        // 6. Campo de Upload de Arquivo / Imagem
        {
          type: 'object',
          name: 'fileUploadField',
          title: 'Campo: Envio de Arquivo / Imagem',
          fields: [
            defineField({name: 'label', title: 'Rótulo do Campo', type: 'string', initialValue: 'Enviar Anexo / Referência'}),
            defineField({name: 'description', title: 'Instruções para o Anexo', type: 'string', description: 'Ex: Envie imagens em JPG/PNG ou documentos em PDF.'}),
            defineField({name: 'required', title: 'Obrigatório?', type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {title: 'label'},
            prepare({title}) {
              return {title: `[Upload de Arquivo] ${title || 'Anexo'}`}
            },
          },
        },
      ],
    }),
  ],
})