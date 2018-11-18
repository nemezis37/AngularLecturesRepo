import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recepieBook';
  sectionName = 'recipes';

  onHeaderSectionChanged(args: {sectionName: string}) {
    this.sectionName = args.sectionName;
  }
}


