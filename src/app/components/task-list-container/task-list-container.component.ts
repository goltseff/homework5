import { Component, OnInit } from '@angular/core';
import { ToDoService, ITodoItemData } from '../../services/todo.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-task-list-container',
  templateUrl: './task-list-container.component.html'
})
export class TaskListContainerComponent implements OnInit {
  public items: ITodoItemData[] = [];

  public filterForm: FormGroup;

  constructor(
    private todoService: ToDoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.todoService.loadItemsFromLS();
    this.items = this.todoService.items;
   }

  ngOnInit() {

    this.filterForm = this.formBuilder.group({
      id: [''],
      name: [''],
      tags: [[]]
    });


  }
  delTodo(e: string) {
    const tmpint = parseInt(e, null);
    this.todoService.removeItem(tmpint);
    this.items = this.todoService.items;
  }
  editTodo(e: string) {
    this.router.navigate(['/list/' + e]);
  }
  addTodo() {
    this.router.navigate(['/list/new']);
  }
  todosFilter() {
    const filter_name = this.filterForm.controls.name.value;
    let filter_id = parseInt(this.filterForm.controls.id.value, null);
    let tags_arr: string[] = [];
    tags_arr = this.filterForm.controls.tags.value;

    if (isNaN(filter_id)) { filter_id = 0; }
    this.todoService.loadItemsFromLS();
    this.items = this.todoService.items;
    const filtered_items = [];
    this.items.forEach(function (value) {
      let can_add = true;
      if (filter_id !== 0 && filter_id !== value.id) { can_add = false; }
      if (filter_name !== '' && filter_name !== value.name) { can_add = false; }
      tags_arr.forEach(element => {
        can_add = false;
        if (value.tags.indexOf(element) !== -1) { can_add = true; }
      });

      if (can_add) { filtered_items.push(value); }
    });
    this.items = filtered_items;

  }

}
