import React, {Suspense} from "react";
import "@babylonjs/core/Physics/physicsEngineComponent";  // side-effect adds scene.enablePhysics function
import CenterLayout from "../layout/CenterLayout";
import {
    Grid,
    Button, CardMedia, Card, CardHeader,
} from "@material-ui/core";
import {Engine, Scene, Model} from 'react-babylonjs';
import {Vector3, Color3, Color4, PhysicsImpostor} from "@babylonjs/core";
import {makeStyles} from "@material-ui/core/styles";
import "@babylonjs/loaders/glTF";
import * as BABYLON from 'babylonjs';
import {SceneLoader} from 'babylonjs';
import {CannonJSPlugin} from '@babylonjs/core/Physics/Plugins';
import '../style.css'
// @ts-ignore
import * as CANNON from 'cannon';

window.CANNON = CANNON;


const useStyles = makeStyles({
    btn: {
        marginTop: 20
    },
    smbtn: {
        margin: 3
    },
    greenbtn: {
        marginTop: 20,
        backgroundColor: '#009688'
    },
    main: {
        marginTop: 20
    },
    media: {
        minHeight: 300,
        width: 400,
    },
});


type ModelPose = typeof Vector3;

export interface ModelLoaderProps {
    url: string,
    filename: string,
    scale?: number
    pose?: ModelPose,
    groundsize?: number,
    name?: string,
}


const ModelLoader = (Props: ModelLoaderProps) => {

    const {url, filename, scale, pose, groundsize, name} = Props;
    const finalGroundSize = groundsize || 1000;
    const finalName = name || "random" + Math.random();

    const validateDrag = (targetPosition: { x: number, y: number, z: number }) => {
        return Math.max(Math.abs(targetPosition.x), Math.abs(targetPosition.z)) <= (finalGroundSize / 2) - 10; // should be -15 for torus
    }

    return (
        <Suspense fallback={<box name='fallback' position={new Vector3(-2.5, 0, 0)}/>}>
            {/*@ts-ignore*/}
            <Model
                // meshNames={finalName}
                key={`key${Math.random()}`}
                position={new Vector3(0, 0, 0)}
                rootUrl={url}
                sceneFilename={filename}
                scaleToDimension={scale || 10.0}
                // data={rawGlb}
                pluginExtension=".glb"
                onModelError={(err) => {
                    console.error(err);
                }}
                onModelLoaded={(e) => {
                    console.log(e);
                }}
            >
                <pointerDragBehavior dragPlaneNormal={new Vector3(0, 1, 0)} validateDrag={validateDrag}/>
                <physicsImpostor onCollide={() => {
                    console.log("model Collide!!!!");
                }} type={PhysicsImpostor.BoxImpostor} _options={{
                    mass: 0,
                    restitution: 0.9
                }}/>
            </Model>

        </Suspense>
    )
}

const AddModelInstance = () => {

}
const GROUND_SIZE = 1000;
const DemoScene = () => {
    const classes = useStyles();
    const demoBase = `/assets/demoroom/`;

    const [modelList, setModelList] = React.useState<object[]>([]);
    const [nameList, setNamelist] = React.useState<{ filename: string, scale: number }[]>([]);
    const [scene, setScene] = React.useState<any>();
    const [canvas, setCanvas] = React.useState<any>();

    const gravityVector = new Vector3(0, -9.81, 0);

    const Btns = getModelConfig();

    console.log(modelList);
    console.log("scene", scene);

    return (
        <CenterLayout title={"场景测试"}>
            {/*<Grid item lg={12} className={classes.btn}>*/}
            {/*    <Link href={'/'}>*/}
            {/*        <Button variant="outlined" color="primary" fullWidth>*/}
            {/*            返回*/}
            {/*        </Button>*/}
            {/*    </Link>*/}
            {/*</Grid>*/}

            {Btns.map((el: { filename: string, scale: number }) => {
                return (
                    <Grid item sm={2} lg={2} className={classes.smbtn}>
                        <Button variant="outlined" color="primary" fullWidth onClick={() => {
                            const tmpModel = ModelLoader({
                                url: demoBase,
                                filename: el.filename,
                                scale: el.scale
                            });
                            setModelList((curr) => [...curr, tmpModel]);
                            setNamelist((curr) => [...curr, el]);
                        }}>
                            添加：{el.filename.split('.', 1)}
                        </Button>
                    </Grid>
                )
            })}


            <Grid item xs={12} md={12} className={classes.main}>

                <Card>
                    <CardHeader title={"组合场景展示"} subheader={"可以进行加载模型和拖拽操作"}/>
                    <CardMedia>
                        <Engine
                            antialias
                            adaptToDeviceRatio
                            // engineOptions={{ preserveDrawingBuffer: true, stencil: true }}
                            canvasId='demo'
                        >
                            <Scene clearColor={new Color4(0, 0, 0, 1.0)}
                                   enablePhysics={[gravityVector, new CannonJSPlugin()]} onSceneMount={(args) => {
                                // @ts-ignore
                                // SceneLoader.ImportMesh('', demoBase, 'bed.glb', args.scene)

                                const sc = args.scene;

                                const extend = sc.getWorldExtends();

                                console.log(extend);
                                console.log(sc);

                                setCanvas(args.canvas);
                                setScene(args.scene);
                            }}>
                                <arcRotateCamera name='camera' alpha={0} beta={0} radius={10} target={Vector3.Zero()}
                                                 setPosition={[new Vector3(20, 50, 100)]}
                                                 lowerBetaLimit={0.01} upperBetaLimit={(Math.PI / 2) * 0.99}
                                                 lowerRadiusLimit={20}
                                />
                                <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()}/>


                                {modelList.map(el => el)}

                                <ground name='ground' width={GROUND_SIZE} height={GROUND_SIZE} subdivisions={1}>
                                    <standardMaterial name='groundMat' specularColor={Color3.Black()}/>
                                    <physicsImpostor onCollide={() => {
                                        console.log("ground Collide!!!!");
                                    }} type={PhysicsImpostor.BoxImpostor} _options={{
                                        mass: 0,
                                        restitution: 0.9
                                    }}/>
                                </ground>

                            </Scene>

                        </Engine>
                    </CardMedia>
                </Card>

            </Grid>

        </CenterLayout>
    )
}

const getModelConfig = () => {
    return [
        {
            "filename": "bathtab.glb",
            "scale": 15
        },
        {
            "filename": "bathtab_full.glb",
            "scale": 15
        },
        {
            "filename": "bed.glb",
            "scale": 20
        },
        {
            "filename": "bed_desk.glb",
            "scale": 7
        },
        {
            "filename": "bed_head.glb",
            "scale": 30
        },
        {
            "filename": "big_shelf.glb",
            "scale": 10
        },
        {
            "filename": "book.glb",
            "scale": 10
        },
        {
            "filename": "celling_lamp.glb",
            "scale": 10
        },
        {
            "filename": "chair_black.glb",
            "scale": 10
        },
        {
            "filename": "computer.glb",
            "scale": 10
        },
        {
            "filename": "desk_brown.glb",
            "scale": 10
        },
        {
            "filename": "foot_rest.glb",
            "scale": 10
        },
        {
            "filename": "pillow.glb",
            "scale": 5
        },
        {
            "filename": "shelf.glb",
            "scale": 20
        },
        {
            "filename": "small_desk.glb",
            "scale": 10
        },
        {
            "filename": "small_shelf.glb",
            "scale": 10
        },
        {
            "filename": "small_shelf_2.glb",
            "scale": 10
        },
        {
            "filename": "sofa.glb",
            "scale": 13
        },
        {
            "filename": "sofa_inverted.glb",
            "scale": 13
        },
        {
            "filename": "telephone.glb",
            "scale": 10
        },
        {
            "filename": "vase.glb",
            "scale": 10
        },
        {
            "filename": "wall_structor.glb",
            "scale": 80
        },
        {
            "filename": "wash_basin.glb",
            "scale": 18
        },
        {
            "filename": "wc.glb",
            "scale": 10
        },
    ]
}

export default DemoScene;
