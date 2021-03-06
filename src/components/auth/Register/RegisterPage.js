import React, {useRef, useState} from 'react'
import validatonFields from './Validation';
import {Formik, Form} from 'formik';
import MyTextInput from "../../common/MyTextInput";
import MyPhotoInput from '../../common/MyPhotoInput';
import {useHistory} from 'react-router';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../../actions/auth';

const RegisterPage=() => {

    //це типу наш стейт
    const initState = {
        email: '',
        phone: '',
        login: '',
        password: '',
        confirmPassword: '',
        photo: null
    };

    //силка на наш формік
    const formikRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const titleRef = useRef();
    const history = useHistory();

    const dispatch = useDispatch();

    //функція яка викликається під час події он сабміт (умовно відправляє дані на сервер)


    const onSubmitHandler=(values) =>
    {
        const formData = new FormData();
        Object.entries(values).forEach
        (
            ([key, value]) => formData.append(key, value)
        );
        
        dispatch(RegisterUser(formData))
        .then(result => {
            history.push("/");
        })
        .catch(ex => {
            const {errors} = ex;
            console.log(errors);
            Object.entries(errors).forEach(([key, values]) => {
                let message = '';
                values.forEach(text=> message+=text+" ");
                formikRef.current.setFieldError(key,message);
            });
            setInvalid(errors.invalid);
            titleRef.current.scrollIntoView({ behavior: 'smooth' })
    
        });
        
    }


    //ретурнимо нашу сторінку типу замість рендеру
    return (
        <div className="row">
            <h1 ref={titleRef} className="text-center">Реєстрація</h1>
            {
                invalid && invalid.length > 0 &&
                <div className="alert alert-danger">
                    <ul>
                        {
                            invalid.map((text, index) => {
                                return (
                                    <li key={index}>{text}</li>

                                );
                            })
                        }
                    </ul>
                </div>

            }
            <div className="offset-md-3 col-md-6">
            <Formik 
                innerRef={formikRef}
                initialValues = {initState} 
                onSubmit={onSubmitHandler}
                validationSchema= {validatonFields()}>
                <Form>

                    {/* присвоюєм значення в наш текстовий інпут /common/MyTextInput */}
                    <MyTextInput
                        label = "Електрона пошта"
                        name = "email"
                        type = "email"
                        id= "email"
                        placeH = "Введіть електрону пошту"
                    />

                    <MyTextInput
                        label = "Номер телефону"
                        name = "phone"
                        type = "Number"
                        id= "phone"
                        placeH = "+38(000)000-00-00"
                    />

                    <MyTextInput
                        label = "Логін"
                        name = "login"
                        type = "text"
                        id= "login"
                        placeH = "Введіть логін"
                    />

                    <MyTextInput
                        label = "Пароль"
                        name = "password"
                        type = "password"
                        id= "password"
                        placeH = "Введіть пароль"
                    />

                    <MyTextInput
                        label = "Повторіть пароль"
                        name = "confirmPassword"
                        type = "password"
                        id= "confirmPassword"
                        placeH = "Повторіть пароль"
                    />


                    {/* /common/MyPhotoInput */}
                    <MyPhotoInput
                        Myfield = "photo"
                        name = "photo"
                        id= "photo"
                        formikRef={formikRef}
                    />



                    {/* кнопка відправки форми */}
                    <button type="submit" className="btn btn-dark">Реєстрація</button>
                </Form>
            </Formik>
            </div>
        </div>

    )

}

export default RegisterPage;


