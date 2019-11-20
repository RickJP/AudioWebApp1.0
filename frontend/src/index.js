import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faKey, faUser, faAt, faHeadphones, faComment} from '@fortawesome/free-solid-svg-icons';

library.add(fab, faHeadphones, faComment, faUser, faAt, faKey, faCheck);

ReactDOM.render(<Routes />, document.getElementById("root"));
