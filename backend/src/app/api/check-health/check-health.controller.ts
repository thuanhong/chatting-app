import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckHealthResponse } from '@src/response/check-health.reponse';
import { CheckHealthService } from './check-health.service';

@ApiTags('Check Health')
@Controller('/api/check-health')
export class CheckHealthController {
  constructor(private checkHealthService: CheckHealthService) {}

  @Get('health')
  public getHealth(): CheckHealthResponse {
    return this.checkHealthService.getHealth();
  }

  @Get()
  public getApp(): CheckHealthResponse {
    return this.checkHealthService.getApp();
  }
}
