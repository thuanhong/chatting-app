import { Injectable } from '@nestjs/common';
import { CheckHealthResponse } from '@src/response/check-health.reponse';

@Injectable()
export class CheckHealthService {
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
