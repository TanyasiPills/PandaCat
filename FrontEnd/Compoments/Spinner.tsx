import React from "react";
import {ClipLoader} from "react-spinners"

type Props = {
    isLoading?:boolean;
};

const Spinner = ({isLoading = true}: Props)=>{
    return(<>
    <div id="loading-spinner">
        <ClipLoader color="black" loading={isLoading} size={35} aria-label="Loading Spinner"/>
    </div>
    </>)
};