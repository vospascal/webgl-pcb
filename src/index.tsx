import ReactDOM from 'react-dom';
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, render, events, useThree } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF, Box, Html, TransformControls } from '@react-three/drei';

import { debounce } from '~/utils/utils';

import useStore from '~/store';
import PageLayout from '~/PageLayout';
import SaveJson from '~/SaveJson';
import LoadJson from '~/LoadJson';

export const Sphere = ({ args, ...props }: ISphere) => {
    const { name, edit, setActiveName, setActiveCamera, setDraging, setActivePostion } = useStore((state) => state);
    const [active, setActive] = useState(false);
    const ref = useRef();
    const { camera } = useThree();

    useEffect(() => {
        setActive(name === props.name);
    }, [name]);

    const transformControls = React.useRef<TransformControlsImpl>(null!);

    function changeHandler() {
        const start = Object.assign({}, transformControls.current.positionStart);
        const offset = Object.assign({}, transformControls.current.offset);
        // console.log(transformControls.current);
        // console.log({
        //     x: (start.x += offset.x),
        //     y: (start.y += offset.y),
        //     z: (start.z += offset.z),
        // })
        const position = [+(start.x += offset.x).toFixed(2), +(start.y += offset.y).toFixed(2), +(start.z += offset.z).toFixed(2)];
        setActivePostion({ name, position, camera: camera.position }); // set position

        /// save current camera view
    }

    React.useEffect(() => {
        if (transformControls.current) {
            const { current: controls } = transformControls;
            const callback = (event) => {
                setDraging(event.value); //set is dragging
            };
            controls.addEventListener('dragging-changed', callback);
            controls.addEventListener('objectChange', debounce(changeHandler, 150));
            return () => controls.removeEventListener('dragging-changed', callback);
        }
    });

    return (
        <TransformControls enabled={edit} position={props.position} ref={transformControls} mode={'translate'} showX={active} showY={active} showZ={active}>
            <mesh
                scale={[0.05, 0.05, 0.05]}
                ref={ref}
                onClick={() => {
                    setActiveName(props.name);
                    setActiveCamera(props.camera);
                }}
            >
                <sphereBufferGeometry attach="geometry" args={args} />
                <meshStandardMaterial attach="material" color={active ? 'red' : 'gold'} roughness={0.5} />
            </mesh>
        </TransformControls>
    );
};

const SimpleExample = ({ children }) => {
    const { scene } = useGLTF('Arduino_UNO.glb');

    return (
        <Center position={[0, 0, 0]}>
            <Box args={[2, 2, 2]}>
                <meshNormalMaterial attach="material" wireframe />
            </Box>
            <primitive
                object={scene}
                scale={[0.05, 0.05, 0.05]}
                position={[-2, -1, -1.5]} // The position on the canvas of the object [x,y,x]
                rotation={[-1.58, 0, 0]} // The rotation of the object
                castShadow
            />
            {children}
        </Center>
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
                <div key={item.name}>
                    {/* {JSON.stringify(item, null, 2)} */}
                    <button
                        onClick={() => {
                            state.setActiveName(item.name);
                            state.setActiveCamera(item.camera);
                        }}
                    >
                        {item.title}
                    </button>
                    {state.name === item.name ? <div>{item.text}</div> : null}
                </div>
            ))}
            <hr />
            <input type="text" ref={ref} placeholder="name" />
            <button onClick={() => state.setNewPoint(ref.current.value)}>add point</button>
            <hr />
            <SaveJson />
            <LoadJson />
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
    }, [state.camera]);

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
                    <SimpleExample />

                    {state.points.map((item) => (
                        <Sphere key={item.name} castShadow camera={item.camera} position={item.position} name={item.name} />
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
