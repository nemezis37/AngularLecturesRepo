import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameEdit') nameEditRef: ElementRef;
  @ViewChild('amountEdit') amountEditRef: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  addShoppingListElement() {
    const ingredient = new Ingredient(this.nameEditRef.nativeElement.value, this.amountEditRef.nativeElement.value);
    this.shoppingListService.addIngredient(ingredient);
  }
}
