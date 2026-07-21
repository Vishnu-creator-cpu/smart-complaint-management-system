import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OfficerService from "../../services/OfficerService";
import "./UploadImages.css";

function UploadImages() {

    const { complaintId } = useParams();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [imageType, setImageType] = useState("BeforeWork");
    const [previewImage, setPreviewImage] = useState(null);

    const [location, setLocation] = useState({
        latitude: "",
        longitude: "",
        address: ""
    });

    // Get Current Location

    const GetLocation = () => {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setLocation((prev) => ({

                    ...prev,

                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude

                }));

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Location Captured Successfully.",
                    confirmButtonText: "OK"
                });

            },

            () => {

                Swal.fire({
                    icon: "error",
                    title: "Location Error",
                    text: "Unable to get location.",
                    confirmButtonText: "OK"
                });

            }

        );

    };


    // Upload Image

    const HandleUpload = async (e) => {

        e.preventDefault();

        if (!image) {

            Swal.fire({
                icon: "warning",
                title: "Image Required",
                text: "Please select an image.",
                confirmButtonText: "OK"
            });

            return;

        }

        const formData = new FormData();

        formData.append("ComplaintId", complaintId);
        formData.append("Image", image);
        formData.append("Latitude", location.latitude);
        formData.append("Longitude", location.longitude);
        formData.append("Address", location.address);

        try {

            let result;

            if (imageType === "BeforeWork") {

                result =
                    await OfficerService.UploadBeforeWork(formData);

            }

            else if (imageType === "DuringWork") {

                result =
                    await OfficerService.UploadDuringWork(formData);

            }

            else {

                result =
                    await OfficerService.UploadAfterWork(formData);

            }

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: result,
                confirmButtonText: "OK"
            });

            navigate("/officer/complaints");

        }

        catch (error) {

            console.error("Upload Error :", error);

            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "Image Upload Failed.",
                confirmButtonText: "OK"
            });

        }

    };


    return (

        <div className="upload-work-container">

            <h1>Upload Work Images</h1>

            <p className="complaint-id">

                Complaint ID : {complaintId}

            </p>

            <form
                className="upload-form"
                onSubmit={HandleUpload}
            >

                {/* Work Stage */}

                <div className="form-group">

                    <label>Work Stage</label>

                    <select
                        value={imageType}
                        onChange={(e) =>
                            setImageType(e.target.value)
                        }
                    >

                        <option value="BeforeWork">

                            Before Work

                        </option>

                        <option value="DuringWork">

                            During Work

                        </option>

                        <option value="AfterWork">

                            After Work

                        </option>

                    </select>

                </div>


                {/* Upload Image */}

                <div className="form-group">

                    <label>Upload Image</label>

                    <input

                        type="file"
                        accept="image/*"

                        onChange={(e) => {

                            setImage(e.target.files[0]);

                            setPreviewImage(

                                URL.createObjectURL(
                                    e.target.files[0]
                                )

                            );

                        }}

                        required

                    />

                </div>


                {/* Preview Image */}

                {

                    previewImage && (

                        <div className="image-preview-container">

                            <h3>Image Preview</h3>

                            <img
                                src={previewImage}
                                alt="Preview"
                                className="image-preview"
                            />

                        </div>

                    )

                }


                {/* Address */}

                <div className="form-group">

                    <label>Current Address</label>

                    <input

                        type="text"

                        value={location.address}

                        placeholder="Enter Current Address"

                        onChange={(e) =>

                            setLocation({

                                ...location,
                                address: e.target.value

                            })

                        }

                        required

                    />

                </div>


                {/* Location Button */}

                <button

                    type="button"
                    className="location-btn"

                    onClick={GetLocation}

                >

                    Get Current Location

                </button>


                {/* Location Details */}

                <div className="location-card">

                    <h3>Captured Location</h3>

                    <p>

                        <strong>Latitude :</strong>

                        {location.latitude || " Not Captured"}

                    </p>

                    <p>

                        <strong>Longitude :</strong>

                        {location.longitude || " Not Captured"}

                    </p>

                </div>


                {/* Buttons */}

                <div className="action-buttons">

                    <button
                        type="submit"
                        className="upload-btn"
                    >

                        Upload Image

                    </button>


                    <button

                        type="button"

                        className="back-btn"

                        onClick={() =>

                            navigate(
                                `/officer/complaint/${complaintId}`
                            )

                        }

                    >

                        Back

                    </button>

                </div>

            </form>

        </div>

    );

}

export default UploadImages;