import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {API} from '../config';
import Layout from '../core/Layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './styles/styles.css';
import moment from 'moment';

export default class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
    this.makeDateReadable = (date) => moment(date).format('lll'); 
  }

  componentDidMount() {
    axios.get(`${API}/users`).then(res => {
      const students = res.data;
      this.setState({students});
    });
  }

  render() {
    return (
      <Layout className="container-fluid">
        <div className="row">
          <div className="col-10">
            <div className="card mb-0 mt-0">
              <h3 className="card-header">List of Registered Students</h3>
              <ul className="list-group">
                <Table></Table>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

class Table extends StudentList {
  render() {
    return (
      <Fragment>
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th style= {{paddingRight:0}} className="font-weight-bold" scope="col">
               Name</th>
              {/* <th className="font-weight-bold" scope="col">Email</th> */}
              <th className="font-weight-bold" scope="col">No.</th>
              <th className="font-weight-bold" scope="col">Class</th>
              <th className="font-weight-bold" scope="col">Signed Up</th>
              <th className="font-weight-bold" scope="col">Completed</th>
              <th className="font-weight-bold" scope="col">Folder</th>   
            </tr>
          </thead>
          
          <tbody>
            {this.state.students.map(student => (
              <Fragment  key={student._id}>
                <tr>
                  <td>{student.name}</td>
                  {/* <td>{student.email}</td> */}
                  <td>{student.studentNo}</td>
                  <td>{student.classNo}</td>
                  <td>{this.makeDateReadable(student.createdAt)}</td>
                  <td>{student.recordings.length === 0 ? "---------------" : student.recordings.length === 1 ? student.recordings.length + ' test' : student.recordings.length + ' tests'}</td>
                  {/* {console.log(student)} */}
                  <td>{!student.ulFolder ? '----------': student.ulFolder}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}
