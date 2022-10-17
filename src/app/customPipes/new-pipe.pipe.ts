import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'newPipe'
// })
export class NewPipePipe {
  transform(content: string) {
    const ImageTransform = content.split('/')
  }

}
