import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameEdit') nameEditRef: ElementRef;
  @ViewChild('amountEdit') amountEditRef: ElementRef;

  @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit() {
  }

  addShoppingListElement() {
    const ingredient = new Ingredient(this.nameEditRef.nativeElement.value, this.amountEditRef.nativeElement.value);
    this.ingredientAdded.emit(ingredient);
  }
}
