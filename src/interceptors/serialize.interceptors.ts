import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs';

// Custom Serialise decorator * Accepts any dto for customisation
export const SerializeData = (dto: any) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

export class SerializeInterceptor implements NestInterceptor {
  constructor(private customDto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler) {
    const ctx = GqlExecutionContext.create(context);
    return handler.handle().pipe(
      map((data) => {
        plainToClass(this.customDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
