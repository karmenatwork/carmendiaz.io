import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Img
} from '@react-email/components'
import * as React from 'react'

interface ThankYouProps {
  name: string
}
const baseUrl = process.env.CDE_URL
  ? `https://${process.env.CDE_URL}`
  : "http://localhost:3000/";

import logoCarmen from '@/images/logos/carmen.png'
export default function ThankYouEmail({ name }: ThankYouProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for reaching out!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`${baseUrl}/carmen.png`}
              width="50"
              height="50"
              alt="Carmen"
            />
            <Text style={paragraph}> Hola {name} </Text>
            <Text style={paragraph}>
              Thank you for reaching out! I have received your message and will
              get back to you soon!
            </Text>
            <Text style={paragraph}>Have a great Day!</Text>
            <Text style={paragraph}>Best, Carmen</Text>
            <Hr style={hr} />
            <Text style={footer}>
              Thanks for stopping by my corner of the internet! 💫. You are
              receiving this email because you reached out to me on my website.
              If you have any questions, please feel free to reply to this
              email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}

const box = {
  padding: '0 48px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}