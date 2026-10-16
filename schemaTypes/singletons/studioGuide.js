// ============================================================================
// SCHEMA — GUIA DE USO DO STUDIO (studioGuide)
// ----------------------------------------------------------------------------
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'studioGuide',
  title: '📖 Guia do Studio',
  type: 'document',

  groups: [
    {name: 'general', title: 'Visão Geral & Manual', default: true},
    {name: 'instructions', title: 'Instruções por Seção'},
  ],

  fields: [
    // =========================================================================
    // VISÃO GERAL & MANUAL (GRUPO: GENERAL)
    // =========================================================================
    defineField({
      name: 'introduction',
      title: 'Boas-vindas e Visão Geral',
      type: 'text',
      rows: 4,
      group: 'general',
      initialValue:
        'Bem-vindo ao painel de controle do seu site! Este painel foi estruturado para dar total autonomia na gestão de páginas, serviços, portfólio, agenda e leads. Siga as orientações abaixo antes de publicar novos conteúdos.',
    }),

    defineField({
      name: 'manualPdf',
      title: 'Manual de Uso do Painel (PDF)',
      description:
        'Usuário, faça o download do Manual de uso do Painel Sanity. Ou faça upload de um novo arquivo.',
      type: 'file',
      group: 'general',
      options: {
        accept: '.pdf',
      },
    }),

    // =========================================================================
    // ORIENTAÇÕES POR MÓDULO — COMPACTO (GRUPO: INSTRUCTIONS)
    // =========================================================================

    // 1. Identidade Visual
    defineField({
      name: 'guideBrandSettings',
      title: '1. Identidade Visual (brandSettings)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Centraliza os ativos da identidade visual global do site.\n\n' +
        'Orientações:\n' +
        '• Logotipo: Faça upload do logo principal preferencialmente em formato SVG ou PNG com fundo transparente.\n' +
        '• Favicon: Insira um ícone quadrado (ex: 32x32px ou 64x64px) em PNG ou ICO para a aba do navegador.\n' +
        '• Cores: Cadastre as cores primárias, secundárias e de destaque informando os códigos HEX (ex: #1A1A1A).\n' +
        '• Tipografia: Escolha as combinações de fontes ativas para títulos, subtítulos e textos do corpo.',
    }),

    // 2. Página Inicial
    defineField({
      name: 'guideHomeSettings',
      title: '2. Página Inicial (homeSettings)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Gerencia os textos fixos de apresentação da Home.\n\n' +
        'Orientações:\n' +
        '• Título & Subtítulo: Insira uma frase impactante que defina a proposta de valor do negócio em poucas palavras.\n' +
        '• Imagem Hero: Escolha uma imagem marcante de alta resolução (mínimo 1920x1080px) com o assunto principal centralizado para garantir boa visualização em telas de celular e computador.\n' +
        '• Texto de Introdução: Escreva um resumo institucional curto de 2 a 3 parágrafos.',
    }),

    // 3. Empresa / Studio
    defineField({
      name: 'guideCompanySettings',
      title: '3. Empresa / Studio (companySettings)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Centraliza dados de contato, endereço e redes sociais exibidos nos rodapés e cabeçalhos.\n\n' +
        'Orientações:\n' +
        '• Contato: Informe o e-mail principal e o WhatsApp comercial com DDD (ex: 5511999999999).\n' +
        '• Endereço/Unidades: Preencha o endereço completo da sede ou filiais.\n' +
        '• Redes Sociais: Insira a URL completa dos perfis sociais (ex: https://instagram.com/seu_perfil).',
    }),

    // 4. Serviços / Ofertas
    defineField({
      name: 'guideService',
      title: '4. Serviços / Ofertas (service)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Cadastra cada serviço ou procedimento oferecido pela empresa.\n\n' +
        'Orientações:\n' +
        '• Título & Slug: Digite o nome do serviço e clique em "Generate" para criar a URL amigável.\n' +
        '• Imagem de Capa: Use foto proporcional (16:9 ou 4:3). O preenchimento do Alt Text (Texto Alternativo) é obrigatório para acessibilidade e SEO.\n' +
        '• Resumo Curto: Escreva 1 ou 2 frases explicativas para exibição em cartões e listas.\n' +
        '• Descrição Completa: Detalhe o passo a passo, o que está incluso e requisitos do serviço.',
    }),

    // 5. Pessoas / Colaboradores
    defineField({
      name: 'guidePerson',
      title: '5. Pessoas / Colaboradores (person)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Cadastra os colaboradores, especialistas, artistas ou sócios da empresa.\n\n' +
        'Orientações:\n' +
        '• Nome & Cargo: Preencha o nome completo e o cargo exato (ex: Mecânico Chefe, Especialista, Tatuador Resident).\n' +
        '• Avatar/Foto: Utilize fotos de rosto bem iluminadas e de preferência quadradas (1:1) com fundo neutro.\n' +
        '• Biografia: Escreva uma breve apresentação destacando a experiência do profissional.',
    }),

    // 6. Categorias
    defineField({
      name: 'guideCategory',
      title: '6. Categorias (category)',
      type: 'text',
      rows: 5,
      group: 'instructions',
      initialValue:
        'Função: Cria etiquetas de organização para filtrar serviços, projetos, posts e eventos.\n\n' +
        'Orientações:\n' +
        '• Título: Crie nomes de categorias curtos e objetivos (ex: Workshops, Reformas, Consultoria, Notícias).\n' +
        '• Uso: Evite criar muitas categorias similares para não confundir a navegação do usuário no site.',
    }),

    // 7. Projetos / Elementos
    defineField({
      name: 'guideProject',
      title: '7. Projetos / Elementos (project)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Registra individualmente os elementos/projetos/trabalhos que irão aparecer em galerias e álbuns.\n\n' +
        'Orientações:\n' +
        '• Imagem de Capa: Foto principal que aparecerá nas vitrines do site (preencha o Alt Text).\n' +
        '• Vínculos: Selecione a Categoria correta e o Profissional responsável pelo projeto.\n' +
        '• Galeria Adicional: Adicione várias fotos detalhadas do processo ou do resultado final.',
    }),

    // 8. Álbuns e Galerias
    defineField({
      name: 'guideAlbum',
      title: '8. Álbuns e Galerias (album)',
      type: 'text',
      rows: 5,
      group: 'instructions',
      initialValue:
        'Função: Agrupa coleções e acervos de fotos independentes. Organiza os itens de Projetos/Elementos.\n\n' +
        'Orientações:\n' +
        '• Título & Capa: Dê um nome ao álbum (ex: Inauguração do Estúdio, Fotos da Oficina) e defina uma capa.\n' +
        '• Fotos: Faça upload em lote das imagens e insira legendas em cada foto quando necessário.',
    }),

    // 9. Blog / Artigos
    defineField({
      name: 'guidePost',
      title: '9. Blog / Artigos (post)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Publica artigos educativos, notícias da empresa e conteúdos de marketing.\n\n' +
        'Orientações:\n' +
        '• Autor & Categoria: Associe o artigo a um profissional cadastrado no sistema.\n' +
        '• Data de Publicação: Define a ordem cronológica do post no site.\n' +
        '• Conteúdo: Utilize os recursos do editor rico (títulos h2/h3, listas com marcadores e imagens internas).',
    }),

    // 10. FAQ / Ajuda
    defineField({
      name: 'guideFaq',
      title: '10. FAQ / Ajuda (faq)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Alimenta os blocos (estilo sanfona) do site para tirar dúvidas dos clientes.\n\n' +
        'Orientações:\n' +
        '• Pergunta: Escreva a dúvida exata que o cliente costuma fazer.\n' +
        '• Resposta: Forneça uma resposta direta, clara e amigável.\n' +
        '• Categoria: Agrupe a pergunta por categoria para facilitar a exibição em páginas específicas.',
    }),

    // 11. Depoimentos / Avaliações
    defineField({
      name: 'guideTestimonial',
      title: '11. Depoimentos / Avaliações (testimonial)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Exibe a aprovação e a satisfação de clientes reais (Prova Social). Funciona à partir da criação de um formulário de pesquisa a ser exibido na front end do site (semelhante às avaliações google).\n\n' +
        'Orientações:\n' +
        '• Cliente: Preencha o nome, foto do cliente (opcional) e cargo/empresa se for B2B.\n' +
        '• Texto: Cole o depoimento original mantendo a autenticidade da fala do cliente.\n' +
        '• Nota: Selecione a nota em estrelas (ex: 5 estrelas).',
    }),

    // 12. Agenda & Eventos
    defineField({
      name: 'guideEvent',
      title: '12. Agenda & Eventos (event)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Cria e gerencia o calendário de eventos, palestras, workshops ou plantões.\n\n' +
        'Orientações:\n' +
        '• Datas e Horários: Defina rigorosamente a Data/Hora de Início e Término.\n' +
        '• Local: Especifique se é Presencial (informando o endereço) ou Online (informando o link).\n' +
        '• Inscrição: Caso a venda de ingressos seja externa, insira a URL direta do Sympla/Eventbrite.',
    }),

    // 13. Formulários Dinâmicos
    defineField({
      name: 'guideFormBuilder',
      title: '13. Formulários Dinâmicos (formBuilder)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Cria formulários personalizados sob medida sem precisar programar.\n\n' +
        'Orientações:\n' +
        '• ID do Formulário: Defina um código simples em minúsculas (ex: contato-geral, orcamento-rapido).\n' +
        '• Montagem de Campos: Adicione e reordene os campos desejados (Texto, Telefone, E-mail, Upload de Arquivos, ou Seletores Inteligentes de Serviços/Profissionais).',
    }),

    // 14. Downloads e Materiais
    defineField({
      name: 'guideDownloadable',
      title: '14. Downloads e Materiais (downloadable)',
      type: 'text',
      rows: 5,
      group: 'instructions',
      initialValue:
        'Função: Disponibiliza materiais ricos, PDFs, manuais e e-books para os visitantes.\n\n' +
        'Orientações:\n' +
        '• Arquivo: Faça o upload do arquivo formato PDF, ZIP ou DOCX (tamanho máximo recomendado: 20MB).\n' +
        '• Capa: Insira uma imagem da capa do documento ou e-book para ilustrar o botão no site.',
    }),

    // 15. Páginas Modulares
    defineField({
      name: 'guidePage',
      title: '15. Páginas Modulares (page)',
      type: 'text',
      rows: 6,
      group: 'instructions',
      initialValue:
        'Função: Monta e estrutura o layout visual de páginas inteiras bloco a bloco.\n\n' +
        'Orientações:\n' +
        '• Slug: Define o endereço da página na URL (ex: /sobre-nos, /contato).\n' +
        '• Page Builder: Adicione os blocos na ordem que deseja exibir na tela (ex: 1º Hero, 2º Serviços, 3º Depoimentos, 4º Formulário). Arraste os blocos para mudar a sequência.',
    }),

    // 16. Respostas Recebidas
    defineField({
      name: 'guideFormSubmission',
      title: '16. Respostas Recebidas (formSubmission)',
      type: 'text',
      rows: 5,
      group: 'instructions',
      initialValue:
        'Função: Caixa de entrada onde chegam todas as mensagens enviadas pelos visitantes do site.\n\n' +
        'Orientações:\n' +
        '• Status: Altere o status conforme o atendimento avança (🟡 Novo -> 🔵 Em Andamento -> 🟢 Concluído).\n' +
        '• Uso: Utilize esta seção como um mini-CRM para consultar os dados, telefones e anexos enviados pelos clientes.',
    }),
  ],

  preview: {
    prepare() {
      return {title: '📖 Guia do Studio', subtitle: 'Instruções do Painel'}
    },
  },
})