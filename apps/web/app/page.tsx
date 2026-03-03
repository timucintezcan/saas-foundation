'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { createMachine } from 'xstate';
import type { ReactElement } from 'react';
import { Button, Stack, Surface, Text, ThemeRoot, tokens } from '@saas-foundation/ui';

const previewFlowMachine = createMachine({
  id: 'previewFlow',
  initial: 'idle',
  states: {
    idle: {},
  },
});

export default function Page(): ReactElement {
  return (
    <ThemeRoot>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${tokens.space.xl}px`,
        }}
      >
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Surface
            elevated
            style={{
              width: '100%',
              maxWidth: `${tokens.size.contentMax}px`,
            }}
          >
            <Stack gap="md">
              <Text as="h1" variant="title">
                SaaS Foundation Web
              </Text>
              <Text tone="muted">Next.js + TailwindCSS + Framer Motion + XState scaffold.</Text>
              <Text tone="muted">Machine ID: {previewFlowMachine.id}</Text>
              <Link href="/ui-demo">
                <Button>Open UI Demo</Button>
              </Link>
            </Stack>
          </Surface>
        </motion.div>
      </main>
    </ThemeRoot>
  );
}
