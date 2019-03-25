import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private subdcription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.subdcription = this.recipeService.recipeChanged.subscribe(recipes => this.recipes = recipes);
    this.recipes = this.recipeService.gerRecipes();
  }

  ngOnDestroy(): void {
    this.subdcription.unsubscribe();
  }
}
