import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('My recipe name1', 'My recepe description', 'https://www.tophcgdrops.net/wp-content/uploads/2016/11/phase-2-recipe.jpg'),
    new Recipe('My recipe name2', 'My recepe description', 'https://www.tophcgdrops.net/wp-content/uploads/2016/11/phase-2-recipe.jpg')
  ];
  @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }

  selectRecipe(recipe: Recipe)  {
    this.recipeSelected.emit(recipe);
  }

}
