import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import Pod from "./Pod";

async function getPods() {
    
    const response = await axios.get(
        'http://192.168.56.30:8080/api/v1/namespaces/kube-system/pods'
    );
    
    return response.data.items;
}

function Pods() {

    // 1
    // const [pods, setPods]       = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError]     = useState(null);

    // const [state, dispatch] = useReducer(reducer, {
    //     loading: false,
    //     data: null,
    //     error: null
    // });

    // const fetchPods = async () => {
    //     dispatch({type: 'LOADING'});

    //     try {
    //         // setError(null);
    //         // setPods(null);
    //         // setLoading(true);

    //         const response = await axios.get(
    //             'http://192.168.56.30:8080/api/v1/namespaces/kube-system/pods'
    //         );
    //         // setPods(response.data.items);
    //         dispatch({type: 'SUCCESS', data: response.data.items});
    //         // console.log(response);
    //     } catch (e) {
    //         // setError(e);
    //         dispatch({type: 'ERROR', error: e});
    //     }
    //     // setLoading(false);
    // };

    // useEffect(() => {
    //     fetchPods();
    // }, []);

    // 2
    // const [state, refetch] = useAsync(getUsers, []);
    // const {loading, data: pods, error} = state;
    // console.log(pods);    

    // 3
    const [podName, setPodName] = useState(null);
    const [state, refetch] = useAsync(getPods, [], true);

    const { loading, data: pods, error } = state;

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!pods) return <button onClick={refetch}>불러오기</button>;;

    return (
        <>
            <ul>
                {pods.map(pod => (
                    <li 
                        key={pod.metadata.uid}
                        onClick={() => setPodName(pod.metadata.name)}
                        style={{ cursor: 'pointer' }}
                    >
                        {pod.metadata.name} 
                    </li>
                ))}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            {podName && <Pod podName={podName}/>}
        </>
    )
}

export default Pods;