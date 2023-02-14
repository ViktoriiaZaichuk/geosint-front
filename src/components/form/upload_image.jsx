import React, { useState } from "react";

const UploadImage = ({label, onImageChange, image, setImage}) => {
    const [file, setFile] = useState(null);

    const handleImageChange = async (e) => {
        setFile(e.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
            onImageChange(reader.result);
        };
    };

    return (
        <div className="form-img-upload">
            <label>{label}</label>
            <div className="form-img-upload--wrapper">
                <div>
                    <input
                        type="file"
                        id="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                    <label>Choisir</label>
                </div>
                <span>{file ? file.name : "Aucun fichier sélectionné"}</span>
            </div>
        </div>
    );
}

export default UploadImage;