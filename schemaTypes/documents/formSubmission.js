// ============================================================================
// SCHEMA — SUBMISSÕES DE FORMULÁRIOS / LEADS (formSubmission)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'formSubmission',
  title: 'Respostas de Formulários',
  type: 'document',

  groups: [
    {name: 'general', title: 'Informações do Envio', default: true},
    {name: 'answersGroup', title: 'Dados Preenchidos'},
  ],

  fields: [
    defineField({
      name: 'formRef',
      title: 'Formulário Respondido',
      type: 'reference',
      to: [{type: 'formBuilder'}],
      group: 'general',
      description: 'Qual dos formulários do site gerou esta submissão.',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Data e Hora do Envio',
      type: 'datetime',
      group: 'general',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status do Atendimento / Lead',
      type: 'string',
      group: 'general',
      options: {
        list: [
          {title: '🟡 Novo / Não Lido', value: 'new'},
          {title: '🔵 Em Andamento / Em Contato', value: 'in_progress'},
          {title: '🟢 Concluído / Arquivado', value: 'completed'},
        ],
      },
      initialValue: 'new',
    }),

    // --- RESPOSTAS FLEXÍVEIS DO USUÁRIO ---
    defineField({
      name: 'answers',
      title: 'Respostas Detalhadas',
      type: 'array',
      group: 'answersGroup',
      description: 'Campos preenchidos pelo visitante no momento do envio.',
      of: [
        {
          type: 'object',
          name: 'answerItem',
          title: 'Campo e Resposta',
          fields: [
            defineField({
              name: 'fieldLabel',
              title: 'Nome do Campo',
              type: 'string',
              description: 'Ex: Nome, E-mail, Serviço Escolhido, Mensagem.',
            }),
            defineField({
              name: 'fieldValue',
              title: 'Valor / Resposta Preenchida',
              type: 'text',
              rows: 2,
              description: 'O texto ou escolha enviada pelo usuário.',
            }),
          ],
          preview: {
            select: {
              title: 'fieldLabel',
              subtitle: 'fieldValue',
            },
            prepare({title, subtitle}) {
              return {
                title: title ? `🔹 ${title}` : 'Campo sem rótulo',
                subtitle: subtitle || 'Sem resposta',
              }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      formTitle: 'formRef.title',
      date: 'submittedAt',
      status: 'status',
    },
    prepare(selection) {
      const {formTitle, date, status} = selection
      const formattedDate = date ? new Date(date).toLocaleString('pt-BR') : 'Data desconhecida'
      
      const statusIcons = {
        new: '🟡 [Novo]',
        in_progress: '🔵 [Em Andamento]',
        completed: '🟢 [Concluído]',
      }

      return {
        title: `${statusIcons[status] || '•'} Submissão: ${formTitle || 'Formulário Geral'}`,
        subtitle: `Enviado em: ${formattedDate}`,
      }
    },
  },
})