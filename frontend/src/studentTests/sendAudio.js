import React, {Component} from 'react';
import server from '../helper/currentServer.js';
import {createUserSlug, createDateTimeStamp} from './generateFolderTitle';
import axios from 'axios';

export const sendAudio = (user_Id, taskNo, classNo, studentNo, data) => {
  const userSlug = createUserSlug();
  const dtStamp = createDateTimeStamp();
  let config = {
    header: {
      'Content-Type': 'multipart/form-data',
    },
  };

  console.log('############ SEND_AUDIO #############');
  console.log('SendAudio ' + classNo, studentNo);
  const url = `${server()}audio/upload/${user_Id}/${classNo}-${studentNo}__${userSlug}__Task_${taskNo}/${dtStamp}`;
    axios
    .post(url, data, config)
    .then(res => {
      res.status(200).send(res);
    })
    .catch(err => {
      return err;
    });
};
