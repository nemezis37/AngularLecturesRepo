import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipe = this.recipeService.gerRecipe(+this.route.snapshot.params['id']);
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.gerRecipe(+params['id']);
    });
  }

  onAddIngredientsToShoppingListClick() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onRecipeDelete() {
    this.recipeService.deleteRecipe(this.recipe);
  }
}
