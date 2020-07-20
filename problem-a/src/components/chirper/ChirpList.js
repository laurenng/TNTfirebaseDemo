import React, { Component } from 'react'; //import React Component
import Moment from 'react-moment';
import './Chirper.css'; //load module-specific CSS
import firebase from 'firebase/app';

//A list of chirps that have been posted
export default class ChirpList extends Component {
  constructor(props){
    super(props);
    this.state = {chirps:[]};
  }

  componentDidMount() {
    this.chirpsRef = firebase.database().ref('chirps');
    console.log(this.chirpsRef);
    this.chirpsRef.on('value', (snapshot) => {
      let dataset= snapshot.val();
    
      let array = Object.keys(dataset);

      let chirpsArray = array.map((key) => {
          let chirpObj = dataset[key];
          chirpObj.id = key;

          return chirpObj;
      });
      
      let sortedChirps = chirpsArray.sort(function(a,b) {
        return b.time - a.time;
      });

      this.setState({
        chirps: sortedChirps
      })

    });
  }

  componentWillUnmount() {
    this.chirpsRef.off();
  }

  render() {
    if(!this.state.chirps) return null; //if no chirps, don't display
    
    /* TODO: produce a list of `<ChirpItems>` to render */
    let chirpItems = this.state.chirps.map((key) => {
        return <ChirpItem key={key.id} chirp={key} currentUser={this.props.currentUser}></ChirpItem>
    });


    return (
      <div className="container">
          {chirpItems}
      </div>);
  }
}

//A single Chirp
class ChirpItem extends Component {

  likeChirp = () => {
    /* TODO: update the chirp when it is liked */
    let chirp = this.props.chirp;
    let chirpId = firebase.database().ref('chirps/' + chirp.id + '/likes');
    let uid = this.props.currentUser.uid;

    let current = this.props.chirp.likes;
    if (current === undefined) {
      current = {}
    } 
    
    if (current[uid] !== undefined) {
      current[uid] = null; 
    } else {
      current[uid] = true;
    }
    
    chirpId.set(current)
      .catch((e) => {
        console.log(e);
      });


  }
 
  render() {
    let chirp = this.props.chirp; //current chirp (convenience)

    //counting likes
    let likeCount = 0; //count likes
    let userLikes = false; //current user has liked
    if(chirp.likes){
      likeCount = Object.keys(chirp.likes).length;
      if(chirp.likes[this.props.currentUser.uid]) //if user id is listed
        userLikes = true; //user liked!
    }

    return (
      <div className="row py-4 bg-white border">
        <div className="col-1">
          <img className="avatar" src={chirp.userPhoto} alt={chirp.userName+' avatar'} />
        </div>
        <div className="col pl-4 pl-lg-1">

          <span className="handle">{chirp.userName} {/*space*/}</span>

          <span className="time"><Moment date={chirp.time} fromNow/></span>

          <div className="chirp">{chirp.text}</div>

          {/* A section for showing chirp likes */}
          <div className="likes">          
            <i className={'fa fa-heart '+(userLikes ? 'user-liked': '')} aria-label="like" onClick={this.likeChirp} ></i>
            <span>{/*space*/} {likeCount}</span>
          </div>
        </div>
      </div>      
    );
  }
}
