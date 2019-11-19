/* eslint-disable no-undef */

import { isAuthenticated } from "../auth";
import moment from 'moment';
import slugify from 'slugify';

export const createUserSlug = () =>  {
  const {
    user: { name }
  } = isAuthenticated();
  return slugify(name, {
    replacement: '-',    // replace spaces with replacement
    remove: null,        // regex to remove characters
    lower: true,         // result in lower case
  });
};

export const createDateTimeStamp = () => {
  return moment().format("YYYY_MM_ddd_hh-mm-ss-a");
};  
  




  




