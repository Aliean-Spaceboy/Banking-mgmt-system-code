// This is connected to signup
import React, { Component } from 'react';
import UserService from '../services/UserService';

export default class ListUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null, // Fix state property name
        };
    }

    componentDidMount() {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser); // Fix capitalization of JSON.parse
            UserService.getUserById(user.id)
                .then(res => {
                    console.log("User Details:", res.data);
                    this.setState({ user: res.data }); // Fix state property
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                });
        }
    }

    render() { // Fix: Ensure render() is inside the class
        return (
            <div className="container mt-5">
                <h4 className="text-center">User Details</h4>
                <div className="row">
                    <table className="table table-striped table-bordered w-100">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USERNAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user ? (
                                <tr key={this.state.user.id}>
                                    <td>{this.state.user.id}</td>
                                    <td>{this.state.user.username}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="2">No user logged in</td> {/* Fix: Use colSpan instead of colspan */}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
