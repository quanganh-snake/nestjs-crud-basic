import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';

const HEADERS = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    // const apiKey = req.headers[HEADERS.API_KEY];
    // const authorization = req.headers[HEADERS.AUTHORIZATION];
    // if (!apiKey) {
    //   throw new ForbiddenException('API Key is required');
    // }

    next();
  }
}
