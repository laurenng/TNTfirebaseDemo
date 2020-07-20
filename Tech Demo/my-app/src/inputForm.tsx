import React, { Component } from 'react'; 
import './index.css'; 
import firebase from 'firebase/app';

interface inputState {
    post: string,
    type: string
}

export default class InputForm extends React.Component<{}, inputState>  {
    constructor(props: Readonly<{}>){
      super(props);
      this.state = {post:'', type: ''};
    }
  
    //when the text in the form changes
    updatePost = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
          post: event.target.value
      });
    }

    //when the text in the form changes
    updateType = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            type: event.target.value
        });
      }
  
    //post a new chirp to the database
    addPost = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); //don't submit
      
      // defines new object to add to firebase 
      let newPost = {
        title: this.state.post,
        user: "Lauren",
        topic: "gold",
        type: "Experience",
        time: firebase.database.ServerValue.TIMESTAMP,
        comments: []
      }
      
      // adding the new post to firebase database, sepcifcally to the posts
      firebase.database().ref("posts").push(newPost);
  
      // empties out post for next time 
      this.setState({post:''}); 
    }
  
    render() {
      return (
        <div>
            <div>
              <h1>Type your concerns about ice cream here: </h1>
            </div>
             {/* form to add post to firebase */}
              <form onSubmit={this.addPost}>
                <input name="text" className="form-control mb-2" placeholder="Add comments here" 
                  value={this.state.post} 
                  onChange={this.updatePost}
                  />

                <input name="text" className="form-control mb-2" placeholder="Add type here" 
                  value={this.state.type} 
                  onChange={this.updateType}
                  />
                {/* Only show this if the post length is > 140
                {this.state.post.length > 140 &&
                  <small className="form-text">140 character limit!</small>
                } */}
                
                  {/* Disable if invalid post length */}
                  <button className="btn btn-primary" 
                    disabled={this.state.post.length === 0 || this.state.post.length > 140} 
                    >
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Share
                  </button>
              </form>
        </div>
      );
    }
  }