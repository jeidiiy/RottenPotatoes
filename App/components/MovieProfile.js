import React, { Component, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { GET_COMMENT_REQUEST } from '../reducer/movie';

const MovieProfile = ({ route }) => {
  const [text, onChangeText] = useState('');
  const { commentInfo, getCommentLoading } = useSelector(state => state.movie);
  const dispatch = useDispatch();
  const {
    title,
    summary,
    year,
    poster,
    largePoster,
    genres,
    runtime,
    id,
  } = route.params;

  useEffect(() => {
    dispatch({
      type: GET_COMMENT_REQUEST, 
      movieId: id,
    });
  }, []);
  return (
    <View style={styles.profile}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        {/* keyboardShouldPersistTaps - 키보드 올라와 있을 때도 submit 버튼 동작하는 옵션 */}
        <Image
          style={styles.poster}
          source={{ uri: largePoster }}
          resizeMode={'center'}
        />
        <View style={styles.info}>
          <Text style={styles.title}>
            {JSON.stringify(title).replace(/\"/g, '')}
          </Text>
          <Text style={styles.summary} numberOfLines={5}>
            {JSON.stringify(summary).replace(/\"/g, '')}
          </Text>
          <Text style={styles.runtime}>
            Runtime - {JSON.stringify(runtime)} minutes
          </Text>
          <Text style={styles.genres}>
            {JSON.stringify(...genres).replace(/\"/g, '')} /{' '}
            {JSON.stringify(year)}
          </Text>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeText(text)}
              value={text}
              placeholder="Comment..."
            />
          </View>
          <TouchableOpacity
            style={[
              styles.submitButton,
              text === '' ? styles.notDisplay : styles.onDisplay,
            ]}
            onPress={() => Alert.alert(text)}
          >
            <AntDesign name="rightcircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ScrollView>
        { getCommentLoading && 
        <Text>로딩중입니다.</Text>}
        { !getCommentLoading &&
          commentInfo.map((v, i) =>
           (
             <View>
               <Text style={styles.comment} >{v.userid}</Text>
               <Text key={i} style={styles.comment} >{v.content}</Text>
             </View>
          ))
        }
      </ScrollView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  poster: {
    width,
    height: 400,
  },
  info: {
    padding: 20,
    borderBottomColor: '#282828',
    borderBottomWidth: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    color: '#9E9E9E',
    fontSize: 16,
  },
  runtime: {
    color: '#8c8c8c',
    marginTop: 15,
  },
  genres: {
    color: '#8c8c8c',
  },
  reviewContainer: {
    flexDirection: 'row',
    width,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingLeft: 15,
  },
  inputContainer: {
    flex: 10,
  },
  input: {
    borderColor: '#ffffff',
    backgroundColor: 'white',
    height: 40,
  },
  submitButton: {
    flex: 2,
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    display: 'none',
  },
  onDisplay: {
    display: 'flex',
  },
  notDisplay: {
    display: 'none',
  },
  comment: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    color: 'white',
  }
});

export default MovieProfile;
