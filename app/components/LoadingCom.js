/**
 * Created by DaGuo on 2017/6/30.
 */
import React from 'react'


const LoadingCom = (props)=>{
    if (props.isLoading) {
        // While our other component is loading...
        if (props.timedOut) {
            // In case we've timed out loading our other component.
            return <div>Loader timed out!</div>
        } else if (props.pastDelay) {
            // Display a loading screen after a set delay.
            return <div>Loading...</div>
        } else {
            // Don't flash "Loading..." when we don't need to.
            return null
        }
    } else if (props.error) {
        // If we aren't loading, maybe
        return <div>Error! Component failed to load</div>
    } else {
        // This case shouldn't happen... but we'll return null anyways.
        return null
    }
}
export default LoadingCom