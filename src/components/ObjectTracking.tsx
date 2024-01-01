import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CatmullRomCurve3, Group, Mesh, Shape, Vector3 } from "three";

export const ObjectTracking = () => {
    const boxRef = useRef<Mesh>(null);
    const cameraRef = useRef<Group>(null);
    const curve = useMemo(() => {
        return new CatmullRomCurve3([
            new Vector3(0, 0, 0),
            new Vector3(0, 0, -3),
            new Vector3(-2, 0, -5),
            new Vector3(-2, 0, -6),
            new Vector3(2, 0, -10),
            new Vector3(0, 0, -14),
            new Vector3(0, 0, -30),
        ]);
    }, []);

    const shape = useMemo(() => {
        const shape = new Shape();
        shape.moveTo(0, -0.008);
        shape.lineTo(0, 0.008);
        return shape;
    }, []);

    const scrollData = useScroll();

    useFrame((_, delta) => {
        if (boxRef.current && cameraRef.current) {
            const curPoint = curve.getPoint(scrollData.offset);
            cameraRef.current.position.lerp(
                curve.getPoint(scrollData.offset),
                delta * 24
            );

            const lookAtPoint = curve.getPoint(
                Math.min(scrollData.offset + 0.008, 1)
            );
            const currentLookAt = cameraRef.current.getWorldDirection(new Vector3());
            const targetLookAt = new Vector3()
                .subVectors(curPoint, lookAtPoint)
                .normalize();

            const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
            cameraRef.current.lookAt(cameraRef.current.position.clone().add(lookAt));
            boxRef.current.position.lerp(lookAtPoint, delta * 24);
            boxRef.current.lookAt(cameraRef.current.position);
        }
    });

    return (
        <>
            <group ref={cameraRef}>
                <PerspectiveCamera position={[0, 4, 12]} fov={60} makeDefault />
            </group>
            <Float speed={2} rotationIntensity={0} floatingRange={[1, 2]}>
                <mesh ref={boxRef}>
                    <boxGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Float>
            <mesh>
                <extrudeGeometry args={[shape, { extrudePath: curve, steps: 1000 }]} />
                <meshBasicMaterial />
            </mesh>
        </>
    );
};
