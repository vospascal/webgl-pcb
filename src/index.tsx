import ReactDOM from 'react-dom';
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, render, events, useThree } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF, Box, Html } from '@react-three/drei';

import useStore from '~/store';
import PageLayout from '~/PageLayout';
import useKeyPress from '~/useKeyPress';
import SaveJson from '~/SaveJson';
import LoadJson from '~/LoadJson';

export const Sphere = ({ args, ...props }: ISphere) => {
    const { name, setActiveName, setActivePostion, setActiveCamera, speed } = useStore((state) => state);
    const [active, setActive] = useState(false);
    const ref = useRef();
    const leftKey = useKeyPress(['ArrowLeft']);
    const rightKey = useKeyPress(['ArrowRight']);
    const upKey = useKeyPress(['ArrowUp']);
    const downKey = useKeyPress(['ArrowDown']);
    const ShiftUpKey = useKeyPress(['w']);
    const ShiftDownKey = useKeyPress(['s']);

    const direction = {
        x: -Number(leftKey) / speed + Number(rightKey) / speed,
        y: Number(upKey) / speed - Number(downKey) / speed,
        z: Number(ShiftUpKey) / speed - Number(ShiftDownKey) / speed,
    };

    useEffect(() => {
        setActive(name === props.name);
    }, [name]);

    useEffect(() => {
        if (active) {
            ref.current.position.y = ref.current.position.y += direction.y;
            ref.current.position.x = ref.current.position.x += direction.x;
            ref.current.position.z = ref.current.position.z += direction.z;
        }
    }, [direction, active]);

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={() => {
                setActiveName(props.name);
                setActivePostion(props.name, ref.current.position);
                setActiveCamera(props.camera);
            }}
        >
            <sphereBufferGeometry attach="geometry" args={args} />
            <meshStandardMaterial attach="material" color={active ? 'red' : 'gold'} roughness={0.5} />
        </mesh>
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
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} enableDamping dampingFactor={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Center position={[0, 0, 0]}>
                        <SimpleExample>
                            {state.points.map((item) => (
                                <Sphere key={item.name} castShadow camera={item.camera} position={item.position} scale={[0.05, 0.05, 0.05]} name={item.name} />
                            ))}
                        </SimpleExample>
                    </Center>
                    <CameraPositionMover />
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
