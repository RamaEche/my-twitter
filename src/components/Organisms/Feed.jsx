import React, {useContext, useState, useEffect} from 'react';

import Post from '../molecules/Post';

function Feed({ newPosts }) {
    const [posts, setPosts] = useState([]);
    const [messyPosts, setMessyPosts] = useState([]);

    useEffect(()=>{
      if (newPosts !== null && newPosts !== undefined) {
        let finalPostsOrder = newPosts;
        finalPostsOrder.sort((a, b) => b.dateInMilliseconds - a.dateInMilliseconds);
        setPosts(finalPostsOrder);
      }
    }, [newPosts])

    return (
      <div className=' flex flex-col h-screen overflow-auto scrollbar-none'>
        {posts !== undefined && posts.map((currentArrayData, index) => (
            <div key={index}>
              <Post
                img={currentArrayData.img}
                userAllName={currentArrayData.allUserName}
                userName={currentArrayData.username}
                date={currentArrayData.date}
                content={currentArrayData.content}
                postId={currentArrayData.PostId}
              />
            </div>
          )
        )}
      </div>
    );
}

export default Feed