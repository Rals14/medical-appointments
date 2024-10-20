import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config'
import '../../assets/css/Form.css';


export const Form = () => {

    const { register, handleSubmit, reset, setValue } = useForm();
    const [appointments, setAppointments] = useState([]);

    //Add appointment to the database
    const addAppointment = async (data) => {
        console.log(data);
        await addDoc(collection(db, 'appointments'), {
            name: data.name,
            dui: data.dui,
            date: data.date
        });
        getAppointments();
        reset();
    }

    //Get appointments from the database
    const getAppointments = async () => {
        const appointmentCollection = await getDocs(collection(db, 'appointments'));
        const data = appointmentCollection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setAppointments(data);
    }

    const deleteAppointment = async (id) => {
        const docRef = doc(db, 'appointments', id);
        await deleteDoc(docRef);
        getAppointments();
    }

    //Get appointments when the component is mounted
    useEffect(() => {
        getAppointments()
    }, [])


    return (
        <>
            {/* Form */}
            <div className="form-container">
                <h2>Medical Appointment Form</h2>
                <form className='appointment-form' onSubmit={handleSubmit(addAppointment)}>

                    <div className="form-group">
                        <label className="label">Name</label>
                        <input
                            className="input"
                            type="text"
                            {...register('name', { required: 'This field is required' })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Date</label>
                        <input
                            className="input"
                            type="text"
                            {...register('dui', {
                                required: 'Este campo es obligatorio',
                                //Validate the DUI format
                                pattern: {
                                    value: /^\d{8}-\d{1}$/,
                                    message: 'The DUI must be in the format 12345678-9'
                                }
                            })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Appointment Date</label>
                        <input
                            className="input"
                            type="date"
                            {...register('date', { required: 'This field is required' })}
                        />
                    </div>

                    <button type="submit" className="button">Send</button>
                </form>
            </div>

            {/* Appointments view */}
            <div className='appointments-view'>
                {appointments.map((appointments, index) => (
                    <div key={index} className='appointment'>
                        <p><span>Patient:</span> {appointments.name}</p>
                        <p><span>DUI:</span> {appointments.dui}</p>
                        <p><span>Date:</span> {appointments.date}</p>
                        <button className='button' onClick={() => { deleteAppointment(appointments.id) }}>Delete</button>
                    </div>
                ))}
            </div>
        </>

    )
}
