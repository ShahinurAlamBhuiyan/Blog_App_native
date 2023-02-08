import { View, Text, AsyncStorage, Image, ActivityIndicator } from 'react-native'
import React, { useRef } from 'react'
import { useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { useEffect } from 'react';
import * as firebase from "firebase";
import "firebase/firestore";
import { AuthContext } from '../providers/AuthProvider';
import { FlatList } from 'react-native';
// import { useContext } from 'react';

let userId = '';
let comments = [];
let postId = '';

const CommentScreen = () => {
  const route = useRoute();
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  useEffect(() =>{
    postId = route.params.postId;
    userId = route.params.userId;
    comments = route.params.comments;
    setCommentList(comments);
  }, [])
  
  const postComment = () =>{
    setLoading(true);
    firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({
          userId: userId,comment: comment,postId: postId
      }),
    })
    .then(() =>{
      setLoading(false);
      alert('comment added!');
    })
    .catch(error => {
      setLoading(false);
        alert(error);
    })
    inputRef.current.clear();
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 60,
          flexDirection: "row",
          borderBottomWidth: 0.5,
          borderBottomColor: "#8e8e8e",
          alignItems: 'center'
        }}
      >
        <Text
          style={{ 
            marginLeft: 15, 
            fontSize: 18, 
            fontWeight: '600' }}
        >Comments</Text>
      </View>
      
      <FlatList
        data={commentList}
        renderItem={({item, index}) =>{
          return(
            <View style={{width: '100%', flexDirection: 'row', height: 50, alignItems: 'center'}}>
              <Image 
                source={require('../../assets/user.png')}
                style={{width: 40, height: 40, marginLeft:10,marginRight: 15 }}
                />
              <Text style={{fontSize: 18, fontWeight: '600'}}>{item.comment}</Text>

            </View>
          )
        }}
      />
      <ActivityIndicator size="large" color="red" animating={loading} />
      <View style={{
        width: "100%",
        height: 60,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
        <TextInput
        ref={inputRef}
        value={comment}
        onChangeText={text=>{
          setComment(text);
        }}
         placeholder='type comment here...'
         style={{
          width: '80%',
          // marginLeft: 10,
         }}
         />
        <Text
          style={{
            marginRight: 10,
            fontSize: 18,
            fontWeight:'600'
          }}
          onPress={() =>{
            // getUserId();
            // props.loadPosts();
            postComment();
          }}
        >Send</Text>
      </View>
    </View>
  )
}

export default CommentScreen;