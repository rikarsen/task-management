import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(values: any[], option: string): any {
    if (!option) {
      return values;
    }

    return values.filter(
      value =>
        value.title.toLowerCase().includes(option.toLowerCase()) ||
        value.description.toLowerCase().includes(option.toLowerCase())
    );
  }
}
