import React, {useContext, useState, useEffect} from 'react';

import Post from '../molecules/Post';

function Feed({ newPosts, restPxHeight = '100' }) {
    const [posts, setPosts] = useState([]);
    const [messyPosts, setMessyPosts] = useState([]);

    useEffect(()=>{
      if (newPosts !== null && newPosts !== undefined) {
        let finalPostsOrder = newPosts;
        finalPostsOrder.sort((a, b) => b.dateInMilliseconds - a.dateInMilliseconds);
        setPosts(finalPostsOrder);

        let phHeigt = restPxHeight;
        const contenedoresPadre = document.querySelectorAll(`.feed-container-${restPxHeight}`);
        for (let i = 0; i < contenedoresPadre.length; i++) {
          contenedoresPadre[i].style.height = `calc(100vh - ${restPxHeight}px)`;
        }
      }
    }, [newPosts])

    return (
      <div className={`overflow-y-scroll feed-container-${restPxHeight} scrollbar-none`}>
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