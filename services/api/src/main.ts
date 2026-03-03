import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  // Minimal startup log for local scaffolding.
  // eslint-disable-next-line no-console
  console.log(`api listening on :${port}`);
}

void bootstrap();
