const raf = require('raf') //fix raf warning, redux!

import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

//Firebase mock
jest.mock('firebase/app'); //replace module with my version
firebase.database.ServerValue = {TIMESTAMP:1509433200000}

//helper
function flushPromises() { return new Promise(resolve => setImmediate(resolve)); }

//solution classes
import App from  './src/App';
import ChirpBox from './src/components/chirper/ChirpBox';
import ChirpList from './src/components/chirper/ChirpList';

//test data
const TEST_USER = { email: 'testA@email.com', password: '123456', uid:'sample:1',
                    displayName: 'Person A', photoURL: 'personA.jpg' };
const POSTS = [
  {text:'This is a test post'},
  {text:'This is also a test post'}
]

/* Begin the tests */

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    const sources = ['index.js', 'App.js', 'components/chirper/ChirpBox.js', 'components/chirper/ChirpList.js'].map((src) => __dirname + '/src/' + src);
    const linterOptions = {}; //this should be sufficient with other fields
    sources.forEach((source) => {
      expect([source]).toHaveNoEsLintErrors(linterOptions); //test each
    })
  })
});

let db = firebase.database().ref(); //make the db    

describe('The Chirper app', () => { 

  //sets up firebase & security rules (cannot test)

  it('shows the ChirperHeader', () => {
    let wrapper = shallow(<App />); //mount for further tests    
    let auth = firebase.auth(); //check auth
    auth.changeAuthState(TEST_USER); //log in as test user
    auth.flush(); //run changes
    wrapper.update();
    expect(wrapper.find('ChirperHeader').length).toBe(1);
  })

  it('should post messages from the ChirpBox', () => {    
    let chirpBox = shallow(<ChirpBox currentUser={TEST_USER} />);
    let input = chirpBox.find('textarea');
    input.simulate('change', {target:{value: POSTS[0].text}});
    
    let btn = chirpBox.find('.btn-primary'); //should be post button
    btn.simulate('click', {preventDefault: () => {}});
    db.flush();

    let data = db.getData();
    let chirpKeys = Object.keys(data.chirps);
    let chirp = data.chirps[chirpKeys[0]];
    let expectedObj = { text: POSTS[0].text,
                        time: firebase.database.ServerValue.TIMESTAMP,
                        userId: TEST_USER.uid,
                        userName: TEST_USER.displayName,
                        userPhoto: TEST_USER.photoURL
    };
    expect(chirp).toEqual(expectedObj) //right content in database
  })

  it('should respond to new database values', () => {
    let list = shallow(<ChirpList currentUser={TEST_USER} />);
    db.fakeEvent('value', undefined, null); //send a fake event to render
    db.flush();
    list.update();    
    expect(list.state().chirps).toBeDefined();
  })

  it('renders chirps', () => {
    let list = shallow(<ChirpList currentUser={TEST_USER} />);
    db.fakeEvent('value', undefined, null); //send a fake event to render
    db.flush();
    list.update();

    let item = list.find('ChirpItem');
    let props = item.props();
    expect(props.chirp.text).toEqual(POSTS[0].text); //has right text

    let data = db.getData();
    let chirpKeys = Object.keys(data.chirps);
    expect(props.chirp.id).toEqual(chirpKeys[0]); //was given the chirp id
  })

  it('supports "liking" chirps', () => {
    let list = mount(<ChirpList currentUser={TEST_USER} />);
    db.fakeEvent('value', undefined, null); //send a fake event to render
    db.flush();
    list.update();

    let item = list.find('ChirpItem');
    let likeBtn = item.find('.fa-heart');
    likeBtn.simulate('click'); //like it!
    db.flush();

    let data = db.getData();
    let chirpKeys = Object.keys(data.chirps);
    let chirp = data.chirps[chirpKeys[0]];    
    expect(chirp.likes).toEqual({ 'sample:1': true }); //contains who liked it!

    list.update();
    expect(list.find('.fa-heart').hasClass('user-liked')).toBe(true); //shows in view
  })
})