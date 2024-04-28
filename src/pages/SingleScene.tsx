import React, {Suspense} from "react";
import CenterLayout from "../layout/CenterLayout";
import {
    Grid,
    Button, CardMedia, Card, CardHeader,
} from "@material-ui/core";
import {Link} from "@material-ui/core";
import {Engine, Scene, Model} from 'react-babylonjs';
import {Vector3, Color3} from "@babylonjs/core";
import {makeStyles} from "@material-ui/core/styles";
import "@babylonjs/loaders/glTF"
import '../style.css';

// import * as BABYLON from 'babylonjs';
import 'babylonjs-inspector';
import {debuglog} from "util";

const useStyles = makeStyles({
    btn: {
        marginTop: 20
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

const GROUND_SIZE = 300;
const SingleScene = () => {
    const classes = useStyles();
    let baseUrl = '/assets/';

    const validateDrag = (targetPosition: { x: number, y: number, z: number }) => {
        return Math.max(Math.abs(targetPosition.x), Math.abs(targetPosition.z)) <= (GROUND_SIZE / 2) - 10; // should be -15 for torus
    }

    return (
        <CenterLayout title={"单一模型陈列"}>
            <Grid item lg={12} className={classes.btn}>
                <Link href={'/'}>
                    <Button variant="outlined" color="primary" fullWidth>
                        返回
                    </Button>
                </Link>
            </Grid>


            <Grid item xs={12} md={12} className={classes.main}>

                <Card>
                    <CardHeader title={"单一模型旋转展示"}/>
                    <CardMedia>
                        <Engine
                            antialias
                            adaptToDeviceRatio
                            // engineOptions={{ preserveDrawingBuffer: true, stencil: true }}
                            canvasId='demo'
                        >
                            {/*@ts-ignore*/}
                            <Scene clearColor={new Color3(0, 0, 0)} >
                                <arcRotateCamera name='camera' alpha={0} beta={0} radius={10} target={Vector3.Zero()}
                                                 setPosition={[new Vector3(80, 80, 300)]}
                                                 lowerBetaLimit={0.01} upperBetaLimit={(Math.PI / 2) * 0.99}
                                                 lowerRadiusLimit={20}
                                                 useAutoRotationBehavior={true}
                                />
                                <hemisphericLight name='light1' intensity={1.7} direction={Vector3.Up()}/>

                                <ground name='ground' width={GROUND_SIZE} height={GROUND_SIZE} subdivisions={25}>
                                    <standardMaterial name='groundMat' specularColor={Color3.Black()}  wireframe={true}/>

                                </ground>

                                <Suspense fallback={<box name='fallback' position={new Vector3(-2.5, 0, 0)}/>}>
                                    {/*@ts-ignore*/}
                                    <Model
                                        rootUrl={`${baseUrl}single/`}
                                        sceneFilename='elevator.glb'
                                        scaleToDimension={250.0}
                                        // data={rawGlb}
                                        pluginExtension=".glb"
                                        position={new Vector3(0, 0, 0)}
                                        onModelError={(err) => {
                                            console.error(err);
                                        }}
                                        onModelLoaded={(e) => {
                                            console.log(e);
                                        }}
                                    >


                                    </Model>
                                </Suspense>
                            </Scene>

                        </Engine>
                    </CardMedia>
                </Card>

            </Grid>

        </CenterLayout>
    )
}

export default SingleScene;
