import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import Section from "../templates/Section";
import Article from "../templates/Article";
import SerchBar from "../Organisms/SerchBar";
import Conditions from "../Organisms/Conditions";
import SectionHeader from "../templates/SectionHeader";

import Title from "../../hocs/Title";
import TweetInput from '../Organisms/TweetInput';
import Feed from '../Organisms/Feed';
import TweetViewer from '../Organisms/TweetViewer';

function Post({ setTitle }) {
    const { userName, postId } = useParams()

    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [comentedForm, setComentedForm] = useState();
    setTitle("Tweet info / Twitter");

    useLayoutEffect(()=>{
        fetch(`http://localhost:3000/users/`)
        .then(response => response.json())
        .then(info=>{
            let currentPost;
            for (let i = 0; i < info.length; i++) {
                if (info[i].username == userName) {
                    for (let j = 0; j < info[i].content.posts.length; j++) {
                        if (info[i].content.posts[j].PostId == postId) {
                            currentPost = info[i].content.posts[j];
                            setPost(info[i].content.posts[j]);
                            setComentedForm({
                                userId: info[i].id,
                                PostId: info[i].content.posts[j].PostId
                            })
                        }
                    }
                }
            }
            let commentsPosts =[];
            for (let i = 0; i < currentPost.comments.length; i++) {
                for (let j = 0; j < info.length; j++) {
                    if (info[j].id == currentPost.comments[i].userId) {
                        console.log(info[j].id)
                        for (let k = 0; k < info[j].content.posts.length; k++) {
                            if (info[j].content.posts[k].PostId == currentPost.comments[i].PostId) {
                                commentsPosts.push(info[j].content.posts[k])
                            }
                        }
                    }
                }
            }
            setComments(commentsPosts);
        })
    }, [])

    return (
        <>
            <Section elements={[<SectionHeader title='Tweet' border={false} back={true}/>,
                                post != undefined ? <TweetViewer img={post.img} userAllName={post.allUserName} userName={post.username} date={post.date} content={post.content} postId={post.PostId}/> : <></>,
                                post != undefined ? <TweetInput comentedForm={comentedForm}/>: <></>,
                                <div className='border-t-background-2 border-t-2 h-1'></div>,
                                <Feed newPosts={comments}/>]}/>
            <Article elements={[<SerchBar />, <Conditions />]}/>
        </>
    )
}

export default Title(Post)