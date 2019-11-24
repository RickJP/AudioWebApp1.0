import React, {Component} from 'react';
import server from '../helper/currentServer.js';
import {createUserSlug, createDateTimeStamp} from './prepareAudio';
import axios from 'axios';

export const sendAudio = (user_Id, data) => {
  const userSlug = createUserSlug();
  const dtStamp = createDateTimeStamp();
  let config = {
    header: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const url = `${server()}/api/audio/upload/${user_Id}/${userSlug}/${dtStamp}`;

  axios
    .post(url, data, config)
    .then(res => {
      res.status(400).send(res);
    })
    .catch(err => {
      return err;
    });
};
