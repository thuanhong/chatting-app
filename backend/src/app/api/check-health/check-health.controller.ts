import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckHealthResponse } from '@src/response/check-health.reponse';
import { CheckHealthService } from './check-health.service';

@ApiTags('Check Health')
@Controller('/api/check-health')
export class CheckHealthController {
  constructor(private checkHealthService: CheckHealthService) {}

  @Get('health')
  getHealth(): CheckHealthResponse {
    return this.checkHealthService.getHealth();
  }

  @Get()
  getApp(): CheckHealthResponse {
    return this.checkHealthService.getApp();
  }
}
