import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(values: any[], option: string): any {
    if (!option) {
      return values;
    }

    return values.sort((a: any, b: any) => {
      let opA = option === 'name' ? a.title : a[option].id;
      let opB = option === 'name' ? b.title : b[option].id;

      if (opA < opB) {
        return -1;
      }
      if (opA > opB) {
        return 1;
      }
      return 0;
    });
  }
}
