import React, {Component} from 'react';
import server from '../helper/currentServer.js';
import {createUserSlug, createDateTimeStamp} from './generateFolderTitle';
import axios from 'axios';

export const sendAudio = (user_Id, classNo, studentNo, data) => {
  const userSlug = createUserSlug();
  const dtStamp = createDateTimeStamp();
  let config = {
    header: {
      'Content-Type': 'multipart/form-data',
    },
  };

  console.log('############ SEND_AUDIO #############');
  // console.log('USER_ID  ' + user_Id);
  const url = `${server()}audio/upload/${user_Id}/${classNo}-${studentNo}__${userSlug}/${dtStamp}`;
    axios
    .post(url, data, config)
    .then(res => {
      console.log('####### POST_AUDIO_THROUGH_AXIOS #####');
      res.status(200).send(res);
    })
    .catch(err => {
      return err;
    });
};


// fetch(url, {
//   method: 'POST',
//   body: data,
//   header: {
//     'Content-Type': 'multipart/form-data',
//   }
// })
// .then(res => {
//   console.log('####### POST_AUDIO_THROUGH_AXIOS #####');
//   res.status(200).send(res);
// })
// .catch(err => {
//   return err;
// });
