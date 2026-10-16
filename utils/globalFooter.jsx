// ============================================================================
// HELPER GLOBAL: Rodapé de Orientações (Apenas Texto Limpo)
// ----------------------------------------------------------------------------
import {defineField} from 'sanity'
import {Box, Text} from '@sanity/ui'
import React from 'react'

function CleanNoticeComponent() {
  return (
    <Box paddingY={2}>
      <Text size={1} muted style={{lineHeight: '1.6'}}>
        Os campos deixados em branco serão ignorados com segurança pelo template do site, aplicando os elementos padrão de fallback. Após configurar qualquer bloco, clique no botão <strong>"Publicar" (Publish)</strong> no canto inferior para salvar e atualizar o site.
      </Text>
    </Box>
  )
}

export function getGlobalFooterField(groupNames = []) {
  return defineField({
    name: 'globalFooterNotice',
    title: 'Atenção', // MUDANÇA AQUI: Título limpo e direto
    type: 'string',
    group: groupNames.length > 0 ? groupNames : undefined,
    components: {
      input: CleanNoticeComponent,
    },
  })
}