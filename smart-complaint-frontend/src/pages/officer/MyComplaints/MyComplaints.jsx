import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import OfficerService from "../../../services/OfficerService";

import "./MyComplaints.css";

function MyComplaints() {

    const [complaints, setComplaints] = useState([]);

    const [filteredComplaints, setFilteredComplaints] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const navigate = useNavigate();


    useEffect(() => {

        LoadComplaints();

    }, []);


    const LoadComplaints = async () => {

        try {

            const data =
                await OfficerService.GetMyComplaints();

            setComplaints(data);

            setFilteredComplaints(data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load complaints.",
                confirmButtonText: "OK"
            });

        }

    };


    const HandleSearch = () => {

        const result = complaints.filter((item) =>

            item.complaintTitle
                .toLowerCase()
                .includes(search.toLowerCase())

        );

        setFilteredComplaints(result);

    };

    const HandleStatusFilter = (status) => {

        setStatusFilter(status);

        if (status === "All") {

            setFilteredComplaints(complaints);

            return;

        }

        const result = complaints.filter((item) =>

            item.status === status

        );

        setFilteredComplaints(result);

    };

    const HandleReset = () => {

        setSearch("");

        setFilteredComplaints(complaints);

    };


    return (

        <div className="officer-complaints">

            <h1>My Assigned Complaints</h1>


            {/* Search Section */}

            <div className="search-container">

                <input

                    type="text"

                    placeholder="Search Complaint Title"

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />


                <button
                    className="search-btn"
                    onClick={HandleSearch}
                >
                    Search
                </button>


                <button
                    className="reset-btn"
                    onClick={HandleReset}
                >
                    Reset
                </button>

            </div>

            {/* Status Section */}

            <div className="filter-container">

                <label>Status :</label>

                <select

                    value={statusFilter}

                    onChange={(e) =>
                        HandleStatusFilter(e.target.value)
                    }

                >

                    <option value="All">

                        All

                    </option>

                    <option value="Assigned">

                        Assigned

                    </option>

                    <option value="In Progress">

                        In Progress

                    </option>

                    <option value="Resolved">

                        Resolved

                    </option>

                    <option value="Completed">

                        Completed

                    </option>

                </select>

            </div>


            <table className="officer-complaints-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Complaint Number</th>

                        <th>Title</th>

                        <th>Citizen</th>

                        <th>Category</th>

                        <th>Status</th>

                        <th>Date</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        filteredComplaints.map((item) => (

                            <tr key={item.complaintId}>

                                <td>
                                    {item.complaintId}
                                </td>

                                <td>
                                    {item.complaintNumber}
                                </td>

                                <td>
                                    {item.complaintTitle}
                                </td>

                                <td>
                                    {item.citizenName}
                                </td>

                                <td>
                                    {item.category}
                                </td>

                                <td>

                                    <span className="officer-status">

                                        {item.status}

                                    </span>

                                </td>

                                <td>

                                    {
                                        new Date(
                                            item.createdAt
                                        ).toLocaleDateString()
                                    }

                                </td>

                                <td>

                                    <button

                                        className="view-complaint-btn"

                                        onClick={() =>
                                            navigate(
                                                `/officer/complaint/${item.complaintId}`
                                            )
                                        }

                                    >

                                        View

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default MyComplaints;