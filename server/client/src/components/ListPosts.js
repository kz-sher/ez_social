import React, { forwardRef } from 'react'
import Post from './Post';

const ListPosts = forwardRef(({ posts }, ref) => {
    return (
        <>
            {
                (posts.length > 0) &&
                    posts.map( (post, index) => {
                        if(posts.length - 1 === index || posts.length === 1 ){
                            return (
                                    <Post 
                                        ref={ref}
                                        key={post.date + index}
                                        post={post} />
                            )
                        }
                        else{
                            return (
                                <Post 
                                    key={post.date + index}
                                    post={post} />
                            )
                        }
                    })
            }
        </>
    )
})

export default ListPosts;