import React from "react";
import CenterLayout from "../layout/CenterLayout";
import {Grid,Button} from "@material-ui/core";
import {Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    btnlist: {
        marginTop: 20
    },
});

const Home = () => {
    const classes = useStyles();
    return (
        <CenterLayout title={"3D 项目展示"}>
            <Grid item xs={12} lg={12} md={12} className={classes.btnlist}>
                <Link href={'/single'} >
                    <Button variant="outlined" color="primary" fullWidth>
                        单一模型陈列
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12} lg={12} md={12} className={classes.btnlist}>
                <Link href={'/demoscene'} >
                    <Button variant="outlined" color="primary" fullWidth>
                        测试组合场景
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12} lg={12} md={12} className={classes.btnlist}>
                <Link href={'/pbr'} >
                    <Button variant="outlined" color="primary" fullWidth>
                        基于物理渲染(PBR)
                    </Button>
                </Link>
            </Grid>
        </CenterLayout>
    )
}

export default Home;
