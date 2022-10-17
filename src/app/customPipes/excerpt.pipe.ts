import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(content: string) {
    const postSummary = content.replace(/(<([^>]+)>)/ig, '');
    if (postSummary.length > 300) {
      return postSummary.substring(0,300)
    } else {
      return postSummary;
    }
  }
}
