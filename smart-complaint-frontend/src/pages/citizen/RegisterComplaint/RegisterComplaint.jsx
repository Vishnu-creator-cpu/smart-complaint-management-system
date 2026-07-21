import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import Swal from "sweetalert2";
import ComplaintService from "../../../services/ComplaintService";
import "./RegisterComplaint.css";

function RegisterComplaint() {

    const navigate = useNavigate();

    const [complaint, setComplaint] = useState({

        complaintTitle: "",
        complaintDescription: "",
        categoryId: "",
        priority: "Medium",
        address: "",
        district: "",
        state: "",
        pincode: "",
        latitude: "",
        longitude: "",
        complaintImage: null

    });

    const HandleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === "complaintImage") {

            setComplaint({

                ...complaint,

                complaintImage: files[0]

            });

        }

        else {

            setComplaint({

                ...complaint,

                [name]: value

            });

        }

    };

    const HandleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("ComplaintTitle", complaint.complaintTitle);
        formData.append("ComplaintDescription", complaint.complaintDescription);
        formData.append("CategoryId", complaint.categoryId);
        formData.append("Priority", complaint.priority);
        formData.append("Address", complaint.address);
        formData.append("District", complaint.district);
        formData.append("State", complaint.state);
        formData.append("Pincode", complaint.pincode);
        formData.append("Latitude", complaint.latitude);
        formData.append("Longitude", complaint.longitude);

        if (complaint.complaintImage) {

            formData.append(
                "ComplaintImage",
                complaint.complaintImage
            );

        }

        try {

            const response =
                await ComplaintService.RegisterComplaint(formData);

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: response.message,
                confirmButtonText: "OK"
            });

            navigate("/dashboard/my-complaints");

        }

        catch (error) {

            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Complaint Registration Failed",
                confirmButtonText: "OK"
            });

        }

    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h2>
                    <FaClipboardList
                        style={{
                            marginRight: "10px",
                            color: "#2563eb"
                        }}
                    />
                    Register Complaint
                </h2>

                <form onSubmit={HandleSubmit}>

                    <input
                        type="text"
                        name="complaintTitle"
                        placeholder="Complaint Title"
                        onChange={HandleChange}
                        required
                    />

                    <textarea
                        name="complaintDescription"
                        placeholder="Complaint Description"
                        onChange={HandleChange}
                        required
                    />

                    <select
                        name="categoryId"
                        onChange={HandleChange}
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="1">
                            Road Damage
                        </option>

                        <option value="2">
                            Water Supply
                        </option>

                        <option value="3">
                            Street Light
                        </option>

                        <option value="4">
                            Garbage
                        </option>

                    </select>

                    <select
                        name="priority"
                        onChange={HandleChange}
                    >

                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>

                    </select>

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="text"
                        name="district"
                        placeholder="District"
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="number"
                        step="0.000001"
                        name="latitude"
                        placeholder="Latitude"
                    />

                    <input
                        type="number"
                        step="0.000001"
                        name="longitude"
                        placeholder="Longitude"
                    />

                    <input
                        type="file"
                        name="complaintImage"
                        accept="image/*"
                        onChange={HandleChange}
                    />

                    {
                        complaint.complaintImage && (
                            <p className="file-name">
                                Selected File : {complaint.complaintImage.name}
                            </p>
                        )
                    }

                    <button type="submit">

                        Submit Complaint

                    </button>

                </form>

            </div>

            <div className="register-preview">

                <h2 className="preview-title">

                    Complaint Preview

                </h2>


                <div className="preview-box">

                    <p>

                        <strong>Title :</strong>

                        {complaint.complaintTitle || "Not Entered"}

                    </p>


                    <p>

                        <strong>Category :</strong>

                        {complaint.categoryId || "Not Selected"}

                    </p>


                    <p>

                        <strong>Priority :</strong>

                        {complaint.priority}

                    </p>


                    <p>

                        <strong>District :</strong>

                        {complaint.district || "-"}

                    </p>


                    <p>

                        <strong>State :</strong>

                        {complaint.state || "-"}

                    </p>


                    <p>

                        <strong>Pincode :</strong>

                        {complaint.pincode || "-"}

                    </p>


                </div>



                <div className="workflow">

                    <h3>

                        Complaint Workflow

                    </h3>


                    <div className="workflow-step">

                        Submitted

                    </div>


                    <div className="workflow-step">

                        Assigned

                    </div>


                    <div className="workflow-step">

                        In Progress

                    </div>


                    <div className="workflow-step">

                        Resolved

                    </div>


                </div>


            </div>

        </div>

    );

}

export default RegisterComplaint;