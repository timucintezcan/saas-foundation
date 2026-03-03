import { Controller, Get } from '@nestjs/common';

@Controller('v1')
export class HealthController {
  @Get('health')
  getHealth(): { status: 'ok' } {
    return { status: 'ok' };
  }
}
