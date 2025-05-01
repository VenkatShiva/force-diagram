import { create } from "zustand";
import INITIAL_DATA from "./data";
import { produce } from "immer";
import { persist } from "zustand/middleware";

const useForce = create((set) => ({
  data: INITIAL_DATA,
  changeForce: (setIndex, forceIndex, axis, value) => {
    set(
      produce((state) => {
        state.data.forEach((dataSet, index) => {
          if (index === setIndex) {
            dataSet.points.forEach((forcePoint, forInd) => {
              if (forInd === forceIndex) {
                forcePoint[axis] = Number(value) || 0;
              }
            });
          }
        });
      })
    );
  },
}));

export default useForce;
