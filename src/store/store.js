import { create } from "zustand";
import INITIAL_DATA from "./data";

const useForce = create((set) => ({
  data: INITIAL_DATA,
}));

export default useForce;
