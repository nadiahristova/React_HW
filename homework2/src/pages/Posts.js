import React, { useState, Children } from 'react';

import POSTS from '../data';

export default function Page() {
    const [ userVoteIds, setSelected ] = useState([]);

    function toggleUserVote(post) {
        if(userVoteIds.includes(post.id)){
            post.votes--;
            return setSelected(userVoteIds.filter(v => v !== post.id))
        } else{
            post.votes++;
            return setSelected([...userVoteIds, post.id]);
        }
    }

    return(
        <div className="posts-page">
            <PostsList
                toggleUserVote = {toggleUserVote}
                userVotes = {POSTS.map(p => p.id).filter(id => !userVoteIds.includes(id))}
            />
        </div>
    );
}

function PostsList({userVotes, toggleUserVote}) {

    const [ hasVoted, setHasVoted ] = useState(false);

    function setVote(postId){

        return setHasVoted(userVotes.includes(postId));
    }

    return (
        <main className="center">
            <h2>Posts</h2>
            <div className="post-container">
                {POSTS.map(post => (
                    <div className="row" key={post.id} >
                        <Post post={post} hasVoted={hasVoted}>
                            <button className="voting-btn" onClick = {() => { toggleUserVote(post); setVote(post.id); }}>{post.votes}</button>
                        </Post>
                    </div>
                ))}
            </div>
        </main>
    )
}

function Post( {children, post, hasVoted} ){
    return (
        <>
            <div className={"col" + ({hasVoted} && " voted") }>
                {children}
            </div>
            <div className="col post-body">
                <div className="post-title">
                    <div>
                        {post.title}
                    </div>
                    <div className="hide-btn">
                        X
                    </div>
                </div>
                <div>
                    {post.tagline}
                </div>
            </div>
        </>
    )
}