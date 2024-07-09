import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('File uploaded successfully');
        } catch (err) {
            setMessage(err.response.data.error || 'Error uploading file');
        }
    };

    return (
        <div className="container mt-4">
            <h4>File Upload</h4>
            {message && <p className="alert alert-info">{message}</p>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="file" className="form-control" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Upload</button>
            </form>
        </div>
    );
};

export default FileUpload;
