import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { langFromRequest, translateMessage } from './i18n';

/**
 * HttpException javobidagi `message` ni mijoz tiliga o'giradi.
 * Nest ning standart javob shakli saqlanadi ({ statusCode, message, error }).
 * Tarjima topilmasa xabar o'zgarmaydi.
 */
@Catch(HttpException)
export class I18nExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const body = exception.getResponse();
    const lang = langFromRequest(req);

    const payload: Record<string, unknown> =
      typeof body === 'string'
        ? { statusCode: status, message: body }
        : { ...(body as Record<string, unknown>) };

    const m = payload.message;
    if (typeof m === 'string') payload.message = translateMessage(m, lang);
    else if (Array.isArray(m))
      payload.message = m.map((x) =>
        typeof x === 'string' ? translateMessage(x, lang) : x,
      );

    res.status(status).json(payload);
  }
}
