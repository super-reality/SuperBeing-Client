import { Theme } from '@mui/material/styles'

import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftMessage: {
        display: "flex",
        marginTop: "20px"
    },
    leftContentMsg: {
        marginTop: "20px", 
        marginLeft: "15px"
    },
    rightMessage: {
        display: "flex",
        justifyContent: "flex-end",  
        marginTop: "20px" 
    },
    rightContentMsg: {
        marginTop: "20px", 
        marginRight: "15px"
    },
    formMessage: {
        marginTop: "20% !important"
    }
  })
)