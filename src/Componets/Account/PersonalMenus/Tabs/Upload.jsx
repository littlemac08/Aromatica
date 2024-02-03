import React from 'react'
import { PiCloudArrowUpThin, PiCloudArrowUpFill } from "react-icons/pi";
import { Link } from 'react-router-dom'

import classes from './Upload.module.css'

const Upload = () => {
  return (
    <div className={classes.personal_upload_tab_wrap}>
        <Link to="/upload">
          <div>
            <div><PiCloudArrowUpThin /></div>
            <div><PiCloudArrowUpFill /></div>
          </div>
          <span>Move the Product Upload Page</span>
        </Link>
    </div>
  )
}

export default Upload