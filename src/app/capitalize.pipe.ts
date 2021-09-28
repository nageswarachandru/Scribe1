import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    let firstvalue : string = value.substring(0,1);
    let allother : string = value.substring(1, value.length);

    let newvalue : string = firstvalue.toUpperCase() + allother.toLowerCase()

    return newvalue;
  }

}
