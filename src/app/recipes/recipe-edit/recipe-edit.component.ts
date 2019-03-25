import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.editMode = id != null;
      if (this.editMode) {
        this.recipe = this.recipeService.gerRecipe(+id);
      }
      this.initForm();
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])}));
  }

  private initForm() {
    let id = -1;
    let name = '';
    let description = '';
    let imagePath = '';
    const ingredients = new FormArray([]);

    if (this.recipe) {
      id = this.recipe.id;
      name = this.recipe.name;
      description = this.recipe.description;
      imagePath = this.recipe.imagePath;
      if (this.recipe['ingredients']) {
        for (const ingredient of this.recipe.ingredients) {
          ingredients.push(new FormGroup(
            {'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])}));
        }
      }
    }
    this.recipeForm = new FormGroup(
      {'id': new FormControl(id),
        'name': new FormControl(name, Validators.required),
        'description': new FormControl(description, Validators.required),
        'imagePath': new FormControl(imagePath, Validators.required),
        'ingredients': ingredients});
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onIngredientDelete(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}
