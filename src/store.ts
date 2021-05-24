import create from 'zustand';
// import produce from 'immer';

const useStore = create((set) => ({
    name: '',
    positions: { x: 0, y: 0, z: 0 },
    camera: { x: -3.5, y: 1.5, z: 1.5 },
    setActiveName: (name: string) =>
        set(() => ({
            name: name,
        })),
    setActivePostion: (positions) =>
        set(() => ({
            positions: positions,
        })),
    setActiveCamera: (camera) =>
        set(() => ({
            camera: camera,
        })),
}));

export default useStore;
