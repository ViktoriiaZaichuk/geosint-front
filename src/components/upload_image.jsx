import React, { useState } from "react";

const UploadImage = ({label, register}) => {
    const [file, setFile] = useState(null);

    const onChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="form-img-upload">
            <label>{label}</label>
            <div className="form-img-upload--wrapper">
                <div>
                    <input
                        type="file"
                        id="file"
                        name="Uploader une image"
                        ref={register}
                        onChange={onChange}
                    />
                    <label>Choisir</label>
                </div>
                <span>{file ? file.name : "No file chosen"}</span>
            </div>
        </div>
    );
}

export default UploadImage;