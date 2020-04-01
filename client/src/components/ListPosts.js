import React from 'react'
import Post from './Post';

import { orderBy} from 'lodash';

function ListPosts({ posts }) {
    return (
        <>
            {
                (posts.length > 0) &&
                orderBy(posts, 'date', 'desc').map( post => <Post key={post.date}
                    image="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/06/28/9549b594-97ef-11e9-b82d-cb52a89d5dff_image_hires_193511.jpg?itok=HWrUULJE&v=1561721731" 
                    post={post} />)
            }
        </>
    )
}

export default ListPosts;

// : <Post key={posts.date}
//                         image="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/06/28/9549b594-97ef-11e9-b82d-cb52a89d5dff_image_hires_193511.jpg?itok=HWrUULJE&v=1561721731" 
//                         post={posts} />