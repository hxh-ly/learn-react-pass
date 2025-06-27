import { create } from "zustand";
export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[];
}
interface Action {
  addComponent: (item: Component, parentId?: number) => void;
  deleteComponent: (id: number) => void;
  updateComponentProps: (id: number, props: any) => void;
}

export const useComponentsStore = create<State & Action>((set, get) => {
  return {
    components: [
      {
        id: 1,
        name: "Page",
        props: {},
        desc: "页面",
      },
    ],
    addComponent: (item: Component, parentId?: number) => {
      set((state) => {
        if (parentId) {
          let comp = getComponentById(parentId, state.components);
          if (comp) {
            if (comp.children) {
              comp.children.push(item);
            } else {
              comp.children = [item];
            }
          }
          item.parentId = parentId;
          return { components: [...state.components] };
        }
        return { components: [...state.components, item] };
      });
    },
    deleteComponent: (id: number) => {
      if (!id) {
        return;
      }
      const comp = getComponentById(id, get().components);
      if (comp && comp.parentId) {
        const parentComp = getComponentById(comp.parentId, get().components);
        if (parentComp) {
          parentComp.children = parentComp.children?.filter((v) => v.id !== id);
        }
      }
      set({ components: [...get().components] });
    },
    updateComponentProps: (id: number, props: any) => {
      if (!id) {
        return;
      }
      const comp = getComponentById(id, get().components);
      if (!comp) {
        return;
      }
      set((state) => {
        comp.props = { ...comp.props, ...props };
        return { components: [...state.components] };
      });
    },
  };
});

export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) {
    return null;
  }
  for (let item of components) {
    if (item.id === id) {
      return item;
    }
    if (item.children && item.children.length) {
      let resComponent: Component | null = getComponentById(id, item.children);
      if (resComponent) {
        return resComponent;
      }
    }
  }
  return null;
}
