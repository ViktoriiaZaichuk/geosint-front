import React from "react"
import { ProgressBar } from "react-loader-spinner"

const Loader = ({ style }) => {
    return (
        <div className="loader">
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={style}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#CDB4FF'
                barColor = '#BFFFD6'
            />
        </div>
    )
}

export default Loader