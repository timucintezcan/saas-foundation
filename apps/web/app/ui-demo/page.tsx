'use client';

import { useState, type ReactElement } from 'react';
import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Inline,
  Input,
  Modal,
  ProgressIndicator,
  Select,
  Stack,
  Surface,
  Text,
  ThemeRoot,
  tokens,
} from '@saas-foundation/ui';

export default function UiDemoPage(): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(35);

  return (
    <ThemeRoot>
      <Box
        style={{
          minHeight: '100vh',
          padding: `${tokens.space.xl}px`,
          backgroundColor: tokens.color.bg,
        }}
      >
        <Stack
          gap="xl"
          style={{
            maxWidth: `${tokens.size.contentMax}px`,
            marginInline: 'auto',
          }}
        >
          <Stack gap="sm">
            <Text as="h1" variant="title">
              UI Demo
            </Text>
            <Text tone="muted">Primitives and core components from packages/ui.</Text>
          </Stack>

          <Surface elevated>
            <Stack gap="lg">
              <Text as="h2" variant="title">
                Primitives
              </Text>
              <Divider />
              <Inline align="center" gap="md" wrap>
                <Badge>Neutral</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="danger">Danger</Badge>
                <Icon name="dot" />
                <Icon name="check" />
                <Icon name="chevronDown" />
              </Inline>
              <Grid columns={2} gap="lg">
                <Surface>
                  <Text>Grid Cell A</Text>
                </Surface>
                <Surface>
                  <Text>Grid Cell B</Text>
                </Surface>
              </Grid>
            </Stack>
          </Surface>

          <Surface elevated>
            <Stack gap="lg">
              <Text as="h2" variant="title">
                Core Components
              </Text>
              <Divider />
              <Input placeholder="Input" />
              <Select
                defaultValue="annual"
                options={[
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'annual', label: 'Annual' },
                ]}
              />
              <Inline gap="sm">
                <Button onClick={() => setOpen(true)}>Open Modal</Button>
                <Button variant="ghost" onClick={() => setProgress((value) => Math.min(value + 10, 100))}>
                  Increase Progress
                </Button>
              </Inline>
              <ProgressIndicator value={progress} max={100} />
            </Stack>
          </Surface>
        </Stack>

        <Modal open={open} title="Modal" onClose={() => setOpen(false)}>
          <Text tone="muted">Reusable stateless modal component.</Text>
          <Inline gap="sm" justify="flex-end">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Inline>
        </Modal>
      </Box>
    </ThemeRoot>
  );
}
