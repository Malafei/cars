import React, {useRef, useState, useEffect} from 'react'
import validatonFields from './Validation';
import { useParams } from "react-router-dom";
import {Formik, Form} from 'formik';
import MyTextInput from '../common/MyTextInput';
import MyPhotoInput from '../common/MyPhotoInput';
import {useHistory} from 'react-router';
import { useDispatch } from 'react-redux';
import UserService from '../../services/user.service';
import EclipseWidget from '../common/eclipse';

const EditPage=() => {

    //це типу наш стейт
    const initState = {
        email: '',
        login: '',
        photo: null
    };

    //силка на наш формік
    const formikRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [loading, setLoading] = useState(true);
    const titleRef = useRef();
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();

    //функція яка викликається під час події он сабміт (умовно відправляє дані на сервер)


    const onSubmitHandler=(values) =>
    {
        console.log(values);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));

        Object.entries(values).forEach(([key, value]) => {
            console.log("value", value);
        });

        console.log(formData.values());

        UserService.save(formData)
            .then(res => history.push("/"));
        
        
    }


    useEffect(() => {
        try{
            console.log(id);
            UserService.edit(id)
            .then(res =>{
                const {data} = res;
                formikRef.current.setFieldValue("id", id)
                formikRef.current.setFieldValue("email", data.email)
                formikRef.current.setFieldValue("login", data.login)
                setImagePath("http://localhost:44797/" + data.image)
                setLoading(false);
                //console.log("edit", res.data);
            })
        }
        catch(error){
            console.log("Server error")

        }
    }, [])


    //ретурнимо нашу сторінку типу замість рендеру
    return (
        <div className="row">
            <h1 ref={titleRef} className="text-center">Редагування</h1>
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
                        name = "id"
                        type = "hidden"
                        id= "id"
                        value={id}
                    />

                    <MyTextInput
                        label = "Електрона пошта"
                        name = "email"
                        type = "email"
                        id= "email"
                        placeH = "Введіть електрону пошту"
                    />

                    <MyTextInput
                        label = "Логін"
                        name = "login"
                        type = "text"
                        id= "login"
                        placeH = "Введіть логін"
                    />

                    {/* /common/MyPhotoInput */}
                    {imagePath &&
                        <MyPhotoInput
                        Myfield = "photo"
                        name = "photo"
                        data = {imagePath}
                        id= "photo"
                        formikRef={formikRef}
                        />
                    }



                    {/* кнопка відправки форми */}
                    <button type="submit" className="btn btn-dark">Зберегти</button>
                </Form>
            </Formik>
            </div>

            {loading&& <EclipseWidget/>}
        </div>

    )

}

export default EditPage;