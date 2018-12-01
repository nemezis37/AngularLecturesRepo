import {EventEmitter, Injectable} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  constructor(private shoppingListService: ShoppingListService) {}

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('My recipe name1', 'My recepe description', 'https://www.tophcgdrops.net/wp-content/uploads/2016/11/phase-2-recipe.jpg',
      [new Ingredient('a', 1) , new Ingredient('b', 1)]),
    new Recipe('My recipe name2', 'My recepe description', 'https://www.tophcgdrops.net/wp-content/uploads/2016/11/phase-2-recipe.jpg',
      [new Ingredient('c', 1) , new Ingredient('d', 1)])
  ];

  gerRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
