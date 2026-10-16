import React from 'react'
import {Card, Stack, Text, Flex, Box} from '@sanity/ui'
import {set, unset} from 'sanity'

const fontsList = [
  {id: 'Montserrat', name: 'Montserrat', category: 'Moderna', family: 'Montserrat, sans-serif'},
  {id: 'Inter', name: 'Inter', category: 'Moderna', family: 'Inter, sans-serif'},
  {id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', category: 'Moderna', family: '"Plus Jakarta Sans", sans-serif'},
  
  {id: 'Prata', name: 'Prata', category: 'Clássica & Elegante', family: 'Prata, serif'},
  {id: 'Cormorant Garamond', name: 'Cormorant Garamond', category: 'Clássica & Elegante', family: '"Cormorant Garamond", serif'},
  {id: 'DM Serif Display', name: 'DM Serif Display', category: 'Clássica & Elegante', family: '"DM Serif Display", serif'},
  {id: 'Playfair Display', name: 'Playfair Display', category: 'Clássica & Elegante', family: '"Playfair Display", serif'},
  {id: 'Lora', name: 'Lora', category: 'Clássica & Elegante', family: 'Lora, serif'},
  {id: 'EB Garamond', name: 'EB Garamond', category: 'Clássica & Elegante', family: '"EB Garamond", serif'},
  
  {id: 'Open Sans', name: 'Open Sans', category: 'Neutra & Limpa', family: '"Open Sans", sans-serif'},
  {id: 'Lato', name: 'Lato', category: 'Neutra & Limpa', family: 'Lato, sans-serif'},
  {id: 'Source Sans 3', name: 'Source Sans 3', category: 'Neutra & Limpa', family: '"Source Sans 3", sans-serif'},
]

// Criamos funções geradoras específicas para cada peso que você determinou
function createInputComponent(forcedWeight, positionName, fontSize) {
  return function CustomFontInput(props) {
    const {value, onChange} = props

    const handleSelect = (fontName) => {
      onChange(fontName ? set(fontName) : unset())
    }

    return (
      <Stack space={3}>
        <Text size={1} muted>
          <strong>Posição:</strong> {positionName} (Peso aplicado: <strong>{forcedWeight}</strong>). Clique para selecionar:
        </Text>
        
        <Flex wrap="wrap" gap={3}>
          {fontsList.map((font) => {
            const isSelected = value === font.name
            // Se for fonte clássica e o peso for 800, ajustamos para 600 para não quebrar a tipografia da serifa
            const finalWeight = (forcedWeight === '800' && font.category.includes('Clássica')) ? '600' : forcedWeight
            
            return (
              <Card
                key={font.id}
                as="button"
                type="button"
                padding={4}
                radius={2}
                shadow={isSelected ? 2 : 1}
                tone={isSelected ? 'primary' : 'default'}
                border
                onClick={() => handleSelect(font.name)}
                style={{
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'calc(33.333% - 8px)',
                  minWidth: '220px',
                  background: isSelected ? 'var(--card-focus-ring-color)' : 'var(--card-bg-color)',
                  borderColor: isSelected ? 'var(--card-primary-fg-color)' : 'var(--card-border-color)',
                }}
              >
                <Stack space={2}>
                  <Text size={0} weight="semibold" muted>
                    {font.category}
                  </Text>
                  <Box paddingY={2}>
                    <div
                      style={{
                        fontFamily: font.family,
                        fontWeight: finalWeight,
                        fontSize: fontSize,
                        lineHeight: '1.2',
                        color: 'var(--card-fg-color)',
                      }}
                    >
                      {font.name}
                    </div>
                  </Box>
                  <Flex justify="space-between" align="center">
                    <Text size={0} muted style={{fontStyle: 'italic'}}>
                      {isSelected ? '✓ Selecionado' : 'Aplicar'}
                    </Text>
                    <Text size={0} muted style={{fontSize: '11px', fontWeight: 'bold'}}>
                      Peso: {finalWeight}
                    </Text>
                  </Flex>
                </Stack>
              </Card>
            )
          })}
        </Flex>
        {value && (
          <Flex align="center" gap={2}>
            <Text size={1} muted>Salvo: <strong>{value}</strong></Text>
            <button
              type="button"
              onClick={() => handleSelect(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#e11d48',
                cursor: 'pointer',
                fontSize: '12px',
                textDecoration: 'underline',
              }}
            >
              Limpar
            </button>
          </Flex>
        )}
      </Stack>
    )
  }
}

// Exportamos três variações exatas e independentes do componente
export const HeadingFontInput = createInputComponent('800', 'Títulos (Impacto Máximo)', '26px')
export const SubheadingFontInput = createInputComponent('600', 'Subtítulos (Intermediário)', '20px')
export const BodyFontInput = createInputComponent('400', 'Corpo de Texto (Regular)', '18px')