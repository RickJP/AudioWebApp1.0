import {API} from '../config';
import axios from 'axios';
import 'whatwg-fetch';


export const signup = user => {
  return axios
    .post(`${API}/signup`, JSON.stringify(user), {
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
};


export const adminSignup = user => {
  console.log('ADMIN SIGNUP POST REQUEST');
  return axios
    .post(`${API}/adminSignup`, JSON.stringify(user), {
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
};


export const signin = user => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
};

// export const signin = user => {
//   return fetch(`${API}/signin`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };


// export const signin = user => {
//   return axios(
//     {
//       method: 'post',
//       url:  `${API}/signin`, 
//       data: JSON.stringify(user),
//       headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
//     }
//   )
//   .then(response => {
//     return response.json();
//   })
//   .catch(err => {
//     return err;
//   });
// };




export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
    return axios
      .get(`${API}/signout`)
      .then(response => {
        console.log('signout', response);
      })
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    //console.log(JSON.parse(localStorage.getItem('jwt')));
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
