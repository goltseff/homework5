import {Injectable} from '@angular/core';

export interface ITodoItemData {
    id: number;
    name: string;
    desc: string;
    tags: string[];
    status: number;
    type: string;
  }

@Injectable()
export class ToDoService {
    public statuses_dictionary = [
        'новый', 'в работе', 'выполнен', 'отложен'
    ];
    public tags_dictionary = [
        'tag1', 'tag2', 'tag3'
    ];
    public items: ITodoItemData[] = [];

    public loadItemsFromLS() {
        const tmp_items: ITodoItemData[] = [];
        const storedKeys = Object.keys(localStorage);
        storedKeys.forEach(function (value, index) {
            if (localStorage.getItem(value.toString()).indexOf('"type":"todoiteminlocalstorage"') > -1) {
                const item: ITodoItemData = JSON.parse(localStorage.getItem(value.toString()));
                tmp_items.push(item);
            }
        });
        this.items = tmp_items;
    }
    isExists(p_id: number) {
        let result = false;
        this.items.forEach(function (value, index) {
            if (value.id === p_id) { result = true; }
        });
        return result;
    }
    setItem(item: ITodoItemData) {
        item.type = 'todoiteminlocalstorage';
        localStorage.setItem(item.id.toString(), JSON.stringify(item));
        this.items.push(item);
    }

    removeItem (id: number) {
        let user_del_index = 0;
        localStorage.removeItem(id.toString());
        this.items.forEach(function (value, index) {
            if (value.id === id) { user_del_index = index; }
        });
        this.items.splice(user_del_index, 1);
    }
    getItemByID(p_id: number): ITodoItemData {
        return JSON.parse(localStorage.getItem(p_id.toString()));
    }


}
