import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(
    items: any[],
    field: string,
    direction: 'asc' | 'desc' = 'asc'
  ): any[] {
    if (!items || !field) return items;
    return items.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}