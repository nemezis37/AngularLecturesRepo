import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  @Output() headerSectionChanged: EventEmitter<{sectionName: string}> = new EventEmitter<{sectionName: string}>();

  onRecipesClicked() {
    this.headerSectionChanged.emit({sectionName: 'recipes'});
  }

  onShoppingListClicked() {
    this.headerSectionChanged.emit({sectionName: 'shoppingList'});
  }
}
