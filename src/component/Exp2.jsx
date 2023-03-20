import { useState , useRef ,useCallback} from 'react'
import { useInfiniteQuery } from 'react-query';
import { getPostPage } from '../api/axios';
import Post1 from './Post1';



const Exp2 = () => {
    
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        status,
        error
    } = useInfiniteQuery('/posts',({pageParam = 1})=>getPostPage(pageParam),{
        getNextPageParam:(lastPage,allPages)=>{
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    const intObserver = useRef()
    const lastPostRef = useCallback(post =>{
        if(isFetchingNextPage) return

        if(intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts=>{
            if(posts[0].isIntersecting && hasNextPage){
                console.log('We are near the last post')
                fetchNextPage()
            }
        })
        
        if(post) intObserver.current.observe(post)
    },[isFetchingNextPage,fetchNextPage,hasNextPage])


    if(status === 'error') return <p>Error: {error.message}</p>

    const content = data?.pages.map(pg =>{
        return pg.map((post,i)=>{
            if(pg.length === i + 1){ 
                return <Post1 ref={lastPostRef} key={post.id} post={post}/>
            }
            return <Post1 key={post.id} post={post}/>
        })
    })
    
  return (
    <>
     <h1 id='top' >&infin; Infinite Query &amp; Scroll <br /> &infin; Ex- 2 - React Query</h1>
        {content}     
     {isFetchingNextPage && <p>Loading more posts...</p> }
     <p> <a href="#top">Back to top</a> </p>
    </>
  )
}

export default Exp2
