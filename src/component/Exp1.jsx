import { useState , useRef ,useCallback} from 'react'
import usePosts from '../hooks/usePosts'
import Post1 from './Post1';



const Exp1 = () => {
    

    const [pageNum, setPageNum] = useState(1);
    const {
        isLoading,
        isError,
        error,
        result,
        hasNextPage
    } = usePosts(pageNum)

    const intObserver = useRef()
    const lastPostRef = useCallback(post =>{
        if(isLoading) return

        if(intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts=>{
            if(posts[0].isIntersecting && hasNextPage){
                console.log('We are near the last post')
                setPageNum(prev=>prev + 1)
            }
        })
        
        if(post) intObserver.current.observe(post)
    },[isLoading,hasNextPage])


    if(isError) return <p>Error: {error.message}</p>

    const content = result.map((post,i)=>{
        if(result.length === i+1){ 
            return <Post1 ref={lastPostRef} key={post.id} post={post}/>
         }

        return <Post1 key={post.id} post={post}/>
    })



  return (
    <>
     <h1 id='top' >&infin; Infinite Query &amp; Scroll <br /> &infin; Ex- 1 - React Only</h1>
        {content}     
     {isLoading && <p>Loading more posts...</p> }
     <p> <a href="#top">Back to top</a> </p>
    </>
  )
}

export default Exp1
