import React from "react";
import axios from "axios";
import useAsync from "./useAsync";

async function getPod(podName){
    const response = await axios.get(
        `http://192.168.56.30:8080/api/v1/namespaces/kube-system/pods/${podName}`
    );
    // console.log(response.data);
    return response.data;
}

function Pod({podName}) {
    const [state] = useAsync(() => getPod(podName), [podName]);
    const { loading, data: pod, error} = state;

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!pod) return null;
    
    return (
        <div>
            <h2>{pod.metadata.name}</h2>
            <p>
                <b>image:</b> {pod.spec.containers[0].image}
            </p>
        </div>
    )
}

export default Pod;