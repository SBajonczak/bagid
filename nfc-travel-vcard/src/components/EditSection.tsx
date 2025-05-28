import React, { useEffect, useState } from 'react';
import { TagData } from '../types';

const EditSection = (props:TagData) => {
    const [formData, setFormData] = useState({
        fullName: '',
        startDate: '',
        flightNumber: '',
        destination: '',
        hotelName: '',
        duration: ''
    });

    // useEffect(() => {
    //     // Load travel data based on tagId
    //     const loadTravelData = () => {
    //         const data:TagData = props;
    //         if (data) {
    //             // setFormData({
    //             //     fullName: data.fullName || '',
    //             //     startDate: data.startDate || '',
    //             //     flightNumber: data.flightNumber || '',
    //             //     destination: data.destination || '',
    //             //     hotelName: data.hotelName || '',
    //             //     duration: data.duration || ''
    //             // });
    //         }
    //     };

    //     loadTravelData();
    // }, []);

    // const handleChange = () => {
    //     const { id, value } = e.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [id]: value
    //     }));
    // };

    // const handleSubmit = () => {
    //     e.preventDefault();
    //     if (!formData.fullName || !formData.startDate || !formData.destination) {
    //         alert('Bitte füllen Sie mindestens Name, Startdatum und Ziel aus.');
    //         return;
    //     }
    //     onSave(tagId, formData);
    //     alert('Reisedaten erfolgreich gespeichert!');
    // };

    // return (
    //     <div>
    //         <div className="user-info">
    //             <button className="logout-btn" onClick={() => logout()}>Abmelden</button>
    //             <strong>Angemeldet als:</strong> <span>{currentUser.name}</span><br />
    //             <small>NFC Tag ID: <span>{tagId}</span></small>
    //         </div>

    //         <form id="travelForm" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label htmlFor="fullName">Vollständiger Name:</label>
    //                 <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Max Mustermann" />
    //             </div>

    //             <div className="form-group">
    //                 <label htmlFor="startDate">Startdatum der Reise:</label>
    //                 <input type="date" id="startDate" value={formData.startDate} onChange={handleChange} />
    //             </div>

    //             <div className="form-group">
    //                 <label htmlFor="flightNumber">Flug-/Zugnummer:</label>
    //                 <input type="text" id="flightNumber" value={formData.flightNumber} onChange={handleChange} placeholder="LH1234 oder ICE567" />
    //             </div>

    //             <div className="form-group">
    //                 <label htmlFor="destination">Reiseziel:</label>
    //                 <input type="text" id="destination" value={formData.destination} onChange={handleChange} placeholder="Berlin, Deutschland" />
    //             </div>

    //             <div className="form-group">
    //                 <label htmlFor="hotelName">Hotelname:</label>
    //                 <input type="text" id="hotelName" value={formData.hotelName} onChange={handleChange} placeholder="Hotel Adlon" />
    //             </div>

    //             <div className="form-group">
    //                 <label htmlFor="duration">Aufenthaltsdauer (Tage):</label>
    //                 <input type="number" id="duration" value={formData.duration} onChange={handleChange} min="1" placeholder="5" />
    //             </div>

    //             <button type="submit" className="save-btn">💾 Daten speichern</button>
    //         </form>
    //     </div>
    // );
};

export default EditSection;