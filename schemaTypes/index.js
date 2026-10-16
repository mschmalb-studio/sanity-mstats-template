// schemaTypes/index.js

// 1. Singletons (Arquivos em: ./singletons/)
import brandSettings from './singletons/brandSettings'
import homeSettings from './singletons/homeSettings'
import companySettings from './singletons/companySettings'
import studioGuide from './singletons/studioGuide'

// 2. Documents (Arquivos em: ./documents/)
import project from './documents/project'
import service from './documents/service'
import person from './documents/person'
import album from './documents/album'
import post from './documents/post'
import testimonial from './documents/testimonial'
import event from './documents/event'
import page from './documents/page'
import category from './documents/category'
import faq from './documents/faq'
import downloadable from './documents/downloadable'
import formSubmission from './documents/formSubmission'

// 3. Objects (Arquivos em: ./objects/)
import formBuilder from './objects/formBuilder'


export const schemaTypes = [
  // Singletons (Painéis Únicos)
  brandSettings,
  homeSettings,
  companySettings,
  studioGuide,

  // Documents (Coleções / Múltiplos Itens)
  project,
  service,
  person,
  album,
  post,
  testimonial,
  event,
  page,
  category,
  faq,
  downloadable,
  formSubmission,

  // Objects (Blocos Reutilizáveis)
  formBuilder,
]