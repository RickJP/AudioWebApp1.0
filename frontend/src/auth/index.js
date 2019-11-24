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

// export const signin = user => {
//   return axios
//     .post(`${API}/signin`, JSON.stringify(user), {
//       headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
//     })
//     .then(res => {
//       return res.json();
//     })
//     .catch(err => {
//       return err;
//     });
// };


export const signin = user => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};




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
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};



// export const signup = user => {
//     return fetch(`${API}/signup`, {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => {
//             return err;
//         });
// };


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