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
                                        image="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/06/28/9549b594-97ef-11e9-b82d-cb52a89d5dff_image_hires_193511.jpg?itok=HWrUULJE&v=1561721731" 
                                        post={post} />
                            )
                        }
                        else{
                            return (
                                <Post 
                                    key={post.date + index}
                                    image="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/06/28/9549b594-97ef-11e9-b82d-cb52a89d5dff_image_hires_193511.jpg?itok=HWrUULJE&v=1561721731" 
                                    post={post} />
                            )
                        }
                    })
            }
        </>
    )
})

export default ListPosts;
// orderBy(posts, 'date', 'desc')
{/* <Post key={posts.date}
    image="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/06/28/9549b594-97ef-11e9-b82d-cb52a89d5dff_image_hires_193511.jpg?itok=HWrUULJE&v=1561721731" 
    post={posts} /> */}