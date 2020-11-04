import {ElementRef} from "@angular/core";

declare var M

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initializeFloatingButton(ref: ElementRef) {
    console.log(ref)
    M.FloatingActionButton.init(ref.nativeElement)
}
}
