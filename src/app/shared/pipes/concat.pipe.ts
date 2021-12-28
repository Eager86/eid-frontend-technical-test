import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concat',
})
export class ConcatPipe implements PipeTransform {
  transform(value: string | null, ...args: unknown[]): unknown {
    return value?.concat(args.toString());
  }
}
