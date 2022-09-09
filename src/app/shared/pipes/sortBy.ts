import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'sortBy'
})
export class SortBy implements PipeTransform {
  transform(data: any[]): any[] {
    return data.sort((a, b) => {
      return a - b;
    })
  };
}
