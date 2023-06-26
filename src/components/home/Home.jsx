import React from 'react';
import { Post } from '../post/Post';
import { Story } from '../story/Story';
import { Users } from '../users/Users';
import { StickyNotes } from '../stickynotes/StickyNotes';
import { Test } from '../../test/Test';


export const Home = props => {
  return (
    <div className='home'>
      {/* <Test /> */}
      <Story />
      {/* <StickyNotes /> */}
      <div className="content" style={{display:"flex"}}>
        <Post />
        <Users />
      </div>
    </div>
  )
}


