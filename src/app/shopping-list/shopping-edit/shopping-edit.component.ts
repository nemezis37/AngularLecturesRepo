import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subcription: Subscription;
  isEditing = false;
  elementToEditIndex: number;
  elementToEdit: Ingredient;

  @ViewChild('f') editForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subcription = this.shoppingListService.startedEditing.subscribe(value => {
      this.isEditing = true;
      this.elementToEditIndex = value;
      this.elementToEdit = this.shoppingListService.getIngredient(value);
      this.editForm.setValue({
        name: this.elementToEdit.name,
        amount:  this.elementToEdit.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  onClear() {
    this.editForm.reset();
    this.isEditing = false;
  }

  onDelete() {
    if (this.isEditing) {
      this.shoppingListService.deleteIngredient(this.elementToEditIndex);
      this.onClear();
    }
  }

  addShoppingListElement(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (this.isEditing) {
      this.shoppingListService.updateIngredient(this.elementToEditIndex, ingredient);
    }  else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }
}
