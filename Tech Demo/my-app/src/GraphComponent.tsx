import React from 'react';
import './App.css';
import firebase from 'firebase/app';

// defines arbitrary props value of count (which doesn't do ANYTHING!)
interface homeProps {
    count: number 
}

// defines the states of homeScreen
interface homeStates {
    posts: any[]
}

export default class GraphComponent extends React.Component<homeProps, homeStates> {
    constructor(props: homeProps, state: homeStates){
        super(props, state);
        this.state = {
            posts:[]
        };
      }

    render() {
        if(!this.state.posts) return null; //if no posts, don't display anything
        
        // takes the state's posts array and creates a new div for each post
        let PostList = this.state.posts.map((key) => {
            console.log(key);
            return (
                <div>
                    <p>{key.text} said at {key.time} time</p>
                </div>
            ) 
        });

        // returns the list of post divs 
        return (
        <div className="container">
            <h1>Post List Here: </h1>
            {PostList}
        </div>
        );
    }

    // makes request to firebase to get posts dataset
    private postReference = firebase.database().ref('posts');

    componentDidMount() { // populates posts array state when component appears on screen (aka mounted)
        console.log(this.postReference);

        // callback triggered when data is changed/updated 
        this.postReference.on('value', (snapshot) => {
          // takes the data snapshot of the post reference
          let dataset= snapshot.val();
          console.log(dataset);

          // gets the keys of each post
          let array = Object.keys(dataset);
          
          // goes through the dataset using the keys.
          let postArray = array.map((key) => {
              console.log(key)
              let chirpObj = dataset[key];
              //chirpObj.id = key;
    
              return chirpObj;
          });
          
          // updates the state with the newly created postArray
          this.setState({
            posts: postArray
          })
        });
      }

      // removes callback because component isn't being used 
      componentWillUnmount() {
        this.postReference.off();
      }
}