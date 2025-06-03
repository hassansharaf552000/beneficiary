import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string): any[] {
    if (!items || !searchText) return items;
    const lower = searchText.toLowerCase();
    return items.filter((item) =>
      (item[field] + '').toLowerCase().includes(lower)
    );
  }
}