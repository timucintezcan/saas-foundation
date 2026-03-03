import { useMemo, useState, type ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
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
  Stack,
  Surface,
  Text,
  tokens,
} from '@saas-foundation/ui/native';

const StackNav = createNativeStackNavigator();

function UiDemoScreen(): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(45);
  const nextProgress = useMemo(() => Math.min(progress + 10, 100), [progress]);

  return (
    <Box style={{ flex: 1, backgroundColor: tokens.color.bg, padding: tokens.space.xl }}>
      <Stack gap="xl">
        <Stack gap="sm">
          <Text variant="title">UI Demo (Mobile)</Text>
          <Text tone="muted">Shared tokens and components from packages/ui/native.</Text>
        </Stack>

        <Surface elevated>
          <Stack gap="lg">
            <Text variant="title">Primitives</Text>
            <Divider />
            <Inline gap="sm" align="center">
              <Badge>Neutral</Badge>
              <Badge tone="success">Success</Badge>
              <Badge tone="danger">Danger</Badge>
              <Icon name="dot" />
              <Icon name="check" />
            </Inline>
            <Grid columns={2} gap="sm">
              <Surface>
                <Text>Cell A</Text>
              </Surface>
              <Surface>
                <Text>Cell B</Text>
              </Surface>
            </Grid>
          </Stack>
        </Surface>

        <Surface elevated>
          <Stack gap="lg">
            <Text variant="title">Core Components</Text>
            <Divider />
            <Input placeholder="Input" />
            <Inline gap="sm">
              <Button onPress={() => setOpen(true)}>Open Modal</Button>
              <Button variant="ghost" onPress={() => setProgress(nextProgress)}>
                Increase Progress
              </Button>
            </Inline>
            <ProgressIndicator value={progress} max={100} />
          </Stack>
        </Surface>
      </Stack>

      <Modal open={open} title="Modal" onClose={() => setOpen(false)}>
        <Text tone="muted">Reusable modal from shared native UI package.</Text>
        <Inline justify="flex-end">
          <Button variant="ghost" onPress={() => setOpen(false)}>
            Close
          </Button>
        </Inline>
      </Modal>

      <StatusBar style="light" />
    </Box>
  );
}

export default function App(): ReactElement {
  return (
    <NavigationContainer>
      <StackNav.Navigator>
        <StackNav.Screen
          name="UiDemo"
          component={UiDemoScreen}
          options={{
            title: 'SaaS Foundation UI Demo',
            headerStyle: { backgroundColor: tokens.color.surface },
            headerTintColor: tokens.color.text,
          }}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}
