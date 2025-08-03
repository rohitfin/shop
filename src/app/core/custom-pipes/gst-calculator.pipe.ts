import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gstCalculator'
})
export class GstCalculatorPipe implements PipeTransform {

  transform(value: number, ...args: string[]): any {
    const gstPercentage = args[0] ?? 18;
    // console.log('Gst % ', gstPercentage);
    if (!value) return 0;
    return (value * (parseInt(gstPercentage) / 100)).toFixed(2)
  }

}
