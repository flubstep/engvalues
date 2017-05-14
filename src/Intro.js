import * as React from 'react';

let IntroPage = (props) => {

  return <div>
    <div className="introContainer">
      {/* heh */}
      <style>{`
        body {
          background-color: #f7f7f7 !important;
        }
      `}</style>
      {/* if we want images we could add a relevant meme...   
      <img 
        src="https://img.memesuper.com/d182d4a048c70e78f93fe7c6e94e89fa_dockerized-circus-act-with-mayfly-production-environment-meme_430-539.jpeg" 
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
          width: 215,
          display: 'none'
        }}
      />
      */}
      <h1 style={{textAlign: "center"}}>[Some kind of header content or image]</h1>
      <p>
        Figuring out what you want in your career is hard. We’re inundated with 
        opinions about what we should care about, what makes a good software 
        engineer, how to progress in our careers, and what the hottest company of 
        the year is. The reality is that there is no single right answer - I might 
        care about leaving my impact on the world, you might care about learning
        more about robotics, my friend might care about having time to spend on
        interests outside of work - and in time, even that will change.
      </p><p>
        What follows is an exercise for starting a conversation with yourself about
        what you value and what you’re looking for in the next step in your career.
        Take your time - you may find it helpful to talk to a friend while you’re 
        doing this, or step away for an hour or two and come back to it. It’s as 
        much about the journey as the destination.
      </p><p>
        Let’s get started.
      </p>
    </div>
    <div className="introButton">
      Take the test &raquo;
    </div>
  </div>;
}

export default IntroPage;