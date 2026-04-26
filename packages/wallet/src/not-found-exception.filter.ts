import { Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { EntityNotFoundError } from "typeorm";

/**
 * DBのEntityNotFoundErrorをキャッチしてHTTPのNotFoundExceptionを投げるフィルタ
 */
@Catch(EntityNotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    throw new NotFoundException(exception);
  }
}
