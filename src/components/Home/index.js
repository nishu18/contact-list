import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";


const Home = ({ contacts, deleteContact }) => {
  const [value, setValue]=useState("")

  // useEffect(()=>{
  //   loadUserData();
  // },[]);

  const handleReset=async(e)=>{
    e.preventDefault();
    return await axios.get(`initialState/?q=${value}`)
    .then((response)=>{setData(response.data)
      setValue("")})
    .catch((err)=>console.log(err))
  }
  const handleSearch=()=>{
    loadUserData();
  }

  return (
    <div className="container">
      <form style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center",
      }}
      className="d-flex input-group w-auto"
      onSubmit={handleSearch}>
      <input type="text" placeholder="Search contact" className="form-control" value={value} 
        onChange={(e)=>setValue(e.target.value)}
      />
      <button type="submit" color="dark">Search </button>
   
      
      
      </form>
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
          Add Contact
        </Link>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone no.</th>
                <th scope="col">Company</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.company}</td>
                    <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteContact(contact.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No contacts found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
