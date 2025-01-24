import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { WinstonConfig } from 'src/config/winston.config';
import * as winston from 'winston';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // console.log('res: ', res)
    winston.createLogger(WinstonConfig).log({
      level: 'info',
      fileLog: 'LoggingMiddleware: Request',
      method: `${req.method}`,
      path: `${req.url}`,
      code: req.method === "GET" ? `${JSON.stringify(req.query)}` : `${JSON.stringify(req.body)}`,
      message: `${res.statusCode} - ${res.statusMessage} - >>> ${req.method} ${req.url}`,

    })

    next();
  }
}
