import React, { useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import './CreateAccount.css'

const CreateAccount = (id) => {

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    const today = new Date();
    const createdAt = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        password: yup.string()
            .required('Passwort muss angegeben sein'),
        confirmPassword: yup.string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwörter stimmen nicht überein')

    });

    const formOptions = { resolver: yupResolver(validationSchema)}

    const { register, handleSubmit, reset, formState} = useForm(formOptions);
    const {errors } = formState;

    const onSubmit = (e) => {

            const blog = { name, email, password, createdAt}

            fetch('http://localhost:8000/users', {
                
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(blog)
            }).then(() => {
                navigate("/LogIn")
                
            })
    }

    return(
        <div className="create">
            <h2>Ertselle einen Account:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label>Name</label><br/>
                    <input
                        type="text"
                        required
                        placeholder="Max"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /><br/>
                </div>
                <div className="field">
                    <label>Email</label><br/>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                /><br/>
                </div>
                <div className="field">
                <label>Passwort</label><br/>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="field">
                <label>Passwort bestätigen</label><br/>
                            <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
                <button>Account erstellen</button>
                <button type="button" onClick={() => reset()} className="reset">Zurücksetzen</button>
            </form>
        </div>
    )
}
export default CreateAccount;
