import React, { Component } from 'react'; //import React Component
import './Chirper.css'; //load module-specific CSS
import firebase from 'firebase/app';

//A form the user can use to post a Chirp
export default class ChirpBox extends Component {
  constructor(props){
    super(props);
    this.state = {post:''};
  }

  //when the text in the form changes
  updatePost = (event) => {
    this.setState({post: event.target.value});
  }

  //post a new chirp to the database
  postChirp = (event) => {
    event.preventDefault(); //don't submit
    
    let newChirp = {
      text: this.state.post,
      userId: this.props.currentUser.uid,
      userName: this.props.currentUser.displayName,
      userPhoto: this.props.currentUser.photoURL,
      time: firebase.database.ServerValue.TIMESTAMP 
    }
    /* TODO: add a new Chirp to the database */
    firebase.database().ref("chirps").push(newChirp);

    this.setState({post:''}); //empty out post for next time
  }

  //You do not need to modify this method!
  render() {
    let user = this.props.currentUser; //the current user (convenience)

    return (
      <div className="container">
        <div className="row py-3 chirp-box">
          <div className="col-1">
            <img className="avatar" src={user.photoURL} alt={user.displayName+' avatar'} />
          </div>
          <div className="col pl-4 pl-lg-1">
            <form>
              <textarea name="text" className="form-control mb-2" placeholder="What's Happening...?" 
                value={this.state.post} 
                onChange={this.updatePost}
                />

              {/* Only show this if the post length is > 140 */}
              {this.state.post.length > 140 &&
                <small className="form-text">140 character limit!</small>
              }
              
              <div className="text-right">
                {/* Disable if invalid post length */}
                <button className="btn btn-primary" 
                  disabled={this.state.post.length === 0 || this.state.post.length > 140}
                  onClick={this.postChirp} 
                  >
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Share
                </button> 					
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
