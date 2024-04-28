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
// @ts-ignore
import listReactFiles from 'list-react-files'
import "@babylonjs/loaders/glTF"
import '../style.css';

type ModelPose = typeof Vector3;

export interface ModelLoaderProps {
    url: string,
    filename: string,
    scale?:number
    pose?: ModelPose,
    groundsize?: number
}



const ModelLoader = (Props: ModelLoaderProps)  => {
    const {url, filename, scale, pose, groundsize}= Props;
    const finalGroundSize = groundsize || 1000;
    const finalPose = pose || new Vector3(0, 0, 0);

    const validateDrag = (targetPosition: { x:number, y:number, z: number }) => {
        return Math.max(Math.abs(targetPosition.x), Math.abs(targetPosition.z)) <= (finalGroundSize / 2) - 10; // should be -15 for torus
    }

    return (
        <Suspense fallback={<box name='fallback' position={new Vector3(-2.5, 0, 0)}/>} >
            {/*@ts-ignore*/}
            <Model

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
                <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
                <glowLayer  name="glow" options={{mainTextureSamples: 2}} isEnabled={true}/>
            </Model>
        </Suspense>
    )
}

export default ModelLoader;
