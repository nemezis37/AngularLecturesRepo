import {Injectable} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(1, 'My recipe name1', 'My recepe description', 'https://www.wellplated.com/wp-content/uploads/2017/12/Hoppin-John-recipe-600x629.jpg',
      [new Ingredient('a', 1) , new Ingredient('b', 1)]),
    new Recipe(2, 'My recipe name2', 'My recepe description', 'https://www.wellplated.com/wp-content/uploads/2017/12/Hoppin-John-recipe-600x629.jpg',
      [new Ingredient('c', 1) , new Ingredient('d', 1)])
  ];

  gerRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  gerRecipe(recipeId: number) {
    const recipe = this.recipes.find(
      (s) => {
        return s.id === recipeId;
      }
    );
    return recipe;
  }

  updateRecipe(recipe: Recipe) {
    const currentRecipe = this.recipes.find(s => {
        return s.id === recipe.id;
      });
    this.recipes[this.recipes.indexOf(currentRecipe)] = recipe;
    this.recipeChanged.next(this.recipes);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes);
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
    this.recipeChanged.next(this.recipes);
  }
}
