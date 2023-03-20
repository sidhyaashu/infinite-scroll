import { useState,useEffect } from "react";
import { getPostPage } from "../api/axios";

const usePosts =(pageNum =1)=>{
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})


        const controller = new AbortController()
        const { signal } = controller


        getPostPage(pageNum,{signal}).then(data=>{
            setResult(prev=>[...prev,...data])
            setHasNextPage(Boolean(data.length))
            setIsLoading(false)
        }).catch(e=>{
            setIsLoading(false)
            if(signal.aborted) return 
            setIsError(true)
            setError({message:e.message})
        })

        return ()=>controller.abort()

    }, [pageNum]);


    return { result,isLoading,isError,error,hasNextPage }

}

export default usePosts