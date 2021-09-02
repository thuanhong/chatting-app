import { Injectable } from '@nestjs/common';
import { DataService } from '@src/services/data.service';
import { CheckHealthResponse } from '@src/response/check-health.reponse';

@Injectable()
export class CheckHealthService {
  constructor(private dataService: DataService) {}

  getHealth(): CheckHealthResponse {
    return new CheckHealthResponse({
      message: 'Health OK! From Gatekeeper Service',
    });
  }

  getApp(): CheckHealthResponse {
    return new CheckHealthResponse({
      message: 'Gatekeeper Service Working!',
    });
  }
}
