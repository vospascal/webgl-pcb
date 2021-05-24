import ReactDOM from 'react-dom';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, render, events, useThree } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF, Box, Html, TransformControls } from '@react-three/drei';

import useStore from '~/store';
import PageLayout from '~/PageLayout';
import SaveJson from '~/SaveJson';
import LoadJson from '~/LoadJson';
import { debounce } from '~/utils/utils';

export const Sphere = ({ args, ...props }: ISphere) => {
    const { id, edit, setActiveId, setActiveCamera, setDraging, setActivePostion } = useStore((state) => state);
    const [active, setActive] = useState(false);
    const ref = useRef();
    const { camera } = useThree();

    useEffect(() => {
        setActive(id === props.id);
    }, [id]);

    const transformControls = React.useRef<TransformControlsImpl>(null!);

    React.useEffect(() => {
        // if (transformControls.current) {
        const { current: controls } = transformControls;
        const postionCallback = () => {
            const start = Object.assign({}, transformControls.current.positionStart);
            const offset = Object.assign({}, transformControls.current.offset);
            const cameraPosition = Object.assign({}, camera.position);
            // console.log(transformControls.current);
            // console.log({
            //     x: (start.x += offset.x),
            //     y: (start.y += offset.y),
            //     z: (start.z += offset.z),
            // });
            // console.log(camera.position);
            const position = [(start.x += offset.x), (start.y += offset.y), (start.z += offset.z)];
            setActivePostion({ id: props.id, position, camera: cameraPosition }); // set position
        };
        controls.addEventListener('objectChange', postionCallback);
        return () => controls.removeEventListener('objectChange', postionCallback);
        // }
    });

    React.useEffect(() => {
        // if (transformControls.current) {
        const { current: controls } = transformControls;
        const draggingCallback = (event) => {
            setDraging(event.value); //set is dragging
        };
        controls.addEventListener('dragging-changed', draggingCallback);
        return () => controls.removeEventListener('dragging-changed', draggingCallback);
        // }
    });

    return (
        <TransformControls enabled={edit} position={props.position} ref={transformControls} mode={'translate'} showX={active} showY={active} showZ={active}>
            <mesh
                scale={[0.05, 0.05, 0.05]}
                ref={ref}
                onClick={() => {
                    setActiveId(props.id);
                    setActiveCamera(props.camera);
                }}
            >
                <sphereBufferGeometry attach="geometry" args={args} />
                <meshStandardMaterial attach="material" color={active ? 'red' : 'gold'} roughness={0.5} />
            </mesh>
        </TransformControls>
    );
};

const StmBoard = ({ children }) => {
    const { scene } = useGLTF('v1.0_stm_board_f407.glb');

    return (
        <>
            <primitive
                position={[-0.29, -0.5, -0.905]}
                object={scene}
                scale={[3, 3, 3]}
                // rotation={[-1.58, 0, 0]} // The rotation of the object
                castShadow
            />
            {children}
        </>
    );
};

const TmcBoard = ({ children }) => {
    const { scene } = useGLTF('V1.2_tmc.glb');

    return (
        <>
            <primitive
                position={[0, -1, 0]}
                object={scene}
                scale={[3, 3, 3]}
                // rotation={[-1.58, 0, 0]} // The rotation of the object
                castShadow
            />
            {children}
        </>
    );
};

const Sidebar = () => {
    const state = useStore((state) => state);
    const ref = useRef();

    return (
        <div>
            {/* {JSON.stringify(state, null, 2)} */}
            <br />
            {state.points.map((item) => (
                <div key={item.id}>
                    {/* {JSON.stringify(item, null, 2)} */}
                    <button
                        onClick={() => {
                            state.setActiveId(item.id);
                            state.setActiveCamera(item.camera);
                        }}
                    >
                        {item.title}
                    </button>
                    {state.id === item.id ? <div>{item.text}</div> : null}
                </div>
            ))}
            {state.edit ? (
                <>
                    <hr />
                    <input type="text" ref={ref} placeholder="name" />
                    <button onClick={() => state.setNewPoint(ref.current.value)}>add point</button>
                    <hr />
                    <SaveJson />
                    <LoadJson />
                </>
            ) : null}
            <hr />

            <button onClick={() => state.setEdit(!state.edit)}>editormode({JSON.stringify(state.edit)})</button>
        </div>
    );
};

const CameraPositionMover = () => {
    const { camera } = useThree();
    const state = useStore((state) => state);
    useEffect(() => {
        const { x, y, z } = state.camera;
        camera.position.set(x, y, z); //x, y,z
    }, [state.camera, state.id]);

    return null;
};

const App = () => {
    const state = useStore((state) => state);
    return (
        <PageLayout>
            <PageLayout.Left>
                <Canvas
                    style={{
                        position: 'fixed',
                        height: '100%',
                        width: '100%',
                        top: 0,
                        left: 0,
                    }}
                    pixelRatio={window.devicePixelRatio}
                    shadowMap
                >
                    <ambientLight args={['#BBBBBB', 1]} />
                    <directionalLight args={['#FFFFFF', 0.6]} position={[-0.5, 1, 1]} castShadow />
                    <pointLight position={[10, 10, 10]} />

                    <OrbitControls enabled={!state.dragging} enablePan={true} enableZoom={true} enableRotate={true} enableDamping dampingFactor={0.5} />
                    {/* <Center>
                        <Box args={[2, 2, 2]}>
                            <meshNormalMaterial attach="material" wireframe />
                        </Box>
                    </Center> */}
                    <StmBoard />
                    <TmcBoard />

                    {state.points.map((item) => (
                        <Sphere key={item.id} id={item.id} castShadow camera={item.camera} position={item.position} />
                    ))}
                    <CameraPositionMover />
                    {/* <axesHelper size={2} position={[0, 2, 0]} /> */}
                    <gridHelper position={[0, -0.999, 0]} scale={[2, 2, 2]} />
                </Canvas>
            </PageLayout.Left>
            <PageLayout.Right>
                <Sidebar />
            </PageLayout.Right>
        </PageLayout>
    );
};

ReactDOM.render(
    <React.Suspense fallback={null}>
        <App />
    </React.Suspense>,
    document.getElementById('root'),
);

window.addEventListener('resize', () =>
    render(<mesh />, document.querySelector('canvas')!, {
        events,
        size: { width: window.innerWidth, height: window.innerHeight },
    }),
);

window.dispatchEvent(new Event('resize'));
