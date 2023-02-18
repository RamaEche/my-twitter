import React, {useContext, useState, useEffect} from 'react';

import Post from '../molecules/Post';

function Feed({ feedState, newNosts }) {
    const [lastFeedState, setLastFeedState] = useState(feedState);
    const [postsHistory, setPostsHistory] = useState([]);

    useEffect(()=>{
      if (newNosts !== null && newNosts !== undefined) {
        if (lastFeedState !== feedState) {
          setPostsHistory([]);
          setLastFeedState(feedState);
        }
        const CurrentPosts = postsHistory;
        CurrentPosts.push(newNosts);
        setPostsHistory(CurrentPosts);
        //poner los nuvos post
      }
    }, [newNosts])

    useEffect(()=>{
      console.log("re-renderize");
      console.log(postsHistory)
    }, [postsHistory])

    return (
      <div className=' flex flex-col h-screen overflow-auto scrollbar-none'>
        {postsHistory.map((data) =>
          data.map((currentArrayData, index) => (
            <div key={index}>
              <Post
                img='https://xsgames.co/randomusers/assets/avatars/male/70.jpg'
                userAllName='Ramiro'
                tag='@ramiro'
                date='xxx xx xx'
                content={currentArrayData.content}
              />
            </div>
          ))
        )}
      </div>
    );
}

export default Feed