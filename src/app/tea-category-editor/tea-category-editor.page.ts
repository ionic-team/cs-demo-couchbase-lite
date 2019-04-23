import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tea-category-editor',
  templateUrl: './tea-category-editor.page.html',
  styleUrls: ['./tea-category-editor.page.scss'],
})
export class TeaCategoryEditorPage implements OnInit {
  name: string;
  description: string;

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  save() {
    this.navController.back();
  }
}
