import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
export interface ListItem {
  id: string;
  content: string;
  status: "done" | "todo";
}
type State = {
  list: ListItem[];
};
type Action = {
  addItem(item: ListItem, id: string): void;
  delItem(id: string): void;
  updateItem(item: ListItem): void;
};
const stateCreateor: StateCreator<State & Action> = (set) => ({
  list: [],
  addItem: (item: ListItem, id) => {
    set((state) => {
      const newList = [...state.list];
      if (id === "") {
        return {
          list: [...newList, item],
        };
      }
      const idx = newList.findIndex((v) => v.id === id);
      newList.splice(idx, 0, item);
      return {
        list: newList,
      };
    });
  },
  delItem: (id: string) => {
    set((state) => {
      return {
        list: state.list.filter((v) => v.id !== id),
      };
    });
  },
  updateItem: (item: ListItem) => {
    set((state) => {
      return {
        list: state.list.map((v) => (v.id === item.id ? item : v)),
      };
    });
  },
});
export const useTodoListStore = create<State & Action>()(persist(stateCreateor,{
    name:'todoList'
}));
