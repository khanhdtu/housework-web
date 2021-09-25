import { Container, Box, Close, Text, Button, Flex } from 'theme-ui'
import { ReactElement } from 'react'

export interface Props {
  title: string
  width?: string
  height?: string
  body: ReactElement | ReactElement[]
  onCancel?: () => void
  onConfirm?: () => void
}

export default (props: Props): JSX.Element => {
  const { body, title, width, onCancel, onConfirm } = props

  return (
    <Container
      p={4}
      bg='muted'
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'auto',
        outline: 0,
        zIndex: 1000,
        height: '100%',
        backgroundColor: '#00000073',
      }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          padding: '0 0 24px',
          color: '#000000d9',
          fontSize: '14px',
          lineHeight: '1.5715',
          listStyle: 'none',
          pointerEvents: 'none',
          position: 'relative',
          top: '100px',
          width: 'auto',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        <Box
          sx={{
            width: width ? width : '500px',
            transformOrigin: '19.5px 6px',
            position: 'relative',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            border: 0,
            borderRadius: '2px',
            boxShadow: '0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d',
            pointerEvents: 'auto',
            margin: '0 auto',
          }}
        >
          <Close
            onClick={onCancel}
            sx={{
              position: 'absolute',
              top: 1,
              right: 1,
              zIndex: 10,
              color: '#00000073',
              lineHeight: 1,
              transition: 'color .3s',
            }}
          />
          <Box
            sx={{
              padding: '10px 24px',
              color: '#000000d9',
              background: '#fff',
              borderBottom: '1px solid #eae5e5',
              borderRadius: '2px 2px 0 0',
            }}
          >
            <Text
              sx={{
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              {title}
            </Text>
          </Box>
          <Box
            sx={{
              padding: '24px',
              fontSize: '14px',
              lineHeight: '1.5715',
              wordWrap: 'break-word',
            }}
          >
            {body}
          </Box>
          <Flex
            sx={{
              padding: '10px 24px',
              color: '#000000d9',
              background: '#fff',
              borderTop: '1px solid #eae5e5',
              borderRadius: '2px 2px 0 0',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={onCancel}
              sx={{
                paddingTop: 1,
                marginRight: 2,
                color: 'black',
                border: '1px solid #d3c6c6',
                paddingBottom: 1,
                bg: 'white',
                '&:hover': {
                  borderColor: 'primary',
                  border: '1px solid',
                  color: 'primary',
                  transition: 'all .3s cubic-bezier(.645,.045,.355,1)',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              sx={{
                paddingTop: 1,
                paddingBottom: 1,
                color: 'background',
                bg: 'primary',
                '&:hover': {
                  bg: 'primary_hover',
                },
              }}
            >
              OK
            </Button>
          </Flex>
        </Box>
      </Box>
    </Container>
  )
}
