import React, {useContext, useState, useEffect} from 'react';

import Post from '../molecules/Post';

function Feed({ feedState, newPosts }) {
    const [lastFeedState, setLastFeedState] = useState(feedState);
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
                tag={"@" + currentArrayData.username}
                date={currentArrayData.date}
                content={currentArrayData.content}
              />
            </div>
          )
        )}
      </div>
    );
}

export default Feed