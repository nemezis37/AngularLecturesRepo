import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {

  @HostBinding('class.open') styleApplied = false;

  @HostListener('click') clickListener() {
    this.styleApplied = !this.styleApplied;
  }

  constructor() { }

}
