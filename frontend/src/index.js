import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faKey, faLock, faEnvelope, faUser, faAt, faHeadphones, faComment} from '@fortawesome/free-solid-svg-icons';

library.add(fab, faLock, faHeadphones, faComment, faUser, faAt, faKey, faCheck, faEnvelope);

ReactDOM.render(<Routes />, document.getElementById("root"));
