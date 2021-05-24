import points from '~/points';
import create from 'zustand';
import produce from 'immer';

import { v4 as uuidv4 } from 'uuid';
const immer = (config) => (set, get, api) => config((fn) => set(produce(fn)), get, api);

const useStore = create(
    immer((set) => ({
        id: '',
        name: '',
        camera: { x: -3.5, y: 1.5, z: 1.5 },
        points: points,
        dragging: false,
        edit: false,
        setEdit: (edit: boolean) =>
            set(() => ({
                edit: edit,
            })),
        setDraging: (dragging: boolean) =>
            set(() => ({
                dragging: dragging,
            })),
        setActiveId: (id: string) =>
            set(() => ({
                id: id,
            })),
        setActivePostion: ({ id, position, camera }) =>
            set((state) => {
                if (position) {
                    const foundIndex = state.points.findIndex((item) => item.id === id);
                    state.points[foundIndex].position = position;
                    state.points[foundIndex].camera = camera;

                    console.log(foundIndex, 'foundIndex');
                }
                return state;
            }),
        setActiveCamera: (camera) =>
            set(() => ({
                camera: camera,
            })),
        setNewPoint: (name) =>
            set((state) => {
                state.points.push({
                    id: uuidv4(),
                    name: name,
                    camera: { x: 3.9, y: 0.37, z: -1.58 },
                    position: [0, 0, 0],
                    title: `${name} title`,
                    text: `${name} text`,
                });
            }),
        loadPoints: (points) =>
            set((state) => {
                console.log(points);
                state.points = points;
            }),
    })),
);

export default useStore;
