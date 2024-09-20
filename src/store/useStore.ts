import createGodown from "./create-godown";

type Store = {
  value: number;
  setValue: () => void;
}

export const useStore = createGodown<Store>((set, get) => {
  return {
    value: 0,
    setValue: () => {
      set((state) => ({ value: state.value++ }))
      console.log(get());

    }
  };
})