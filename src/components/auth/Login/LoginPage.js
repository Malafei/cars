import React, {useRef, useState} from 'react'
import validatonFields from './Validation';
import {Formik, Form} from 'formik';
import MyTextInput from "../../common/MyTextInput";
import http from "../../../http_common";
import {useHistory} from 'react-router';

const LoginPage=()=>{

    const initState = {
        email: '',
        password: '',
    };


    const formikRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const titleRef = useRef();
    const history = useHistory();

    const onSubmitHandler=(values) =>
    {
        const formData = new FormData();
        Object.entries(values).forEach
        (
            ([key, value]) => formData.append(key, value)
        );

        http.post("api/acount/login", formData,
        {
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        
        }).then(resp => {
            console.log("Good result", resp);
            history.push("/");
        }, bad => { 
            const errors =  bad.response.data.errors;

            Object.entries(errors).forEach(([key, values]) => {
                let message = '';
                values.forEach(text=> message+=text+" ");
                formikRef.current.setFieldError(key,message);
            });
            setInvalid(errors.invalid);
            console.error(bad.response.data);
            titleRef.current.scrollIntoView({ behavior: 'smooth' })
        });
        console.log("Server submit data", values);
    }
    


    return (
        <div className="row">
            <h1 className="text-center">Вхід</h1>
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
                initialValues = {initState} 
                onSubmit={onSubmitHandler}
                validationSchema= {validatonFields()}>
                <Form>

                    <MyTextInput
                        label = "Електрона пошта"
                        name = "email"
                        type = "email"
                        id= "email"
                    />

                    <MyTextInput
                        label = "Пароль"
                        name = "password"
                        type = "password"
                        id= "password"
                    />


                    <button type="submit" className="btn btn-dark">Увійти</button>
                </Form>
            </Formik>
            </div>
        </div>

    )




    // //створюємо обєкт стейт де описуємо наші поля
    // state = {
    //     Email: '',
    //     Password: '',
    //     isValidation: false,

    //     // добавляємо обєкт еррори
    //     errors: {
    //         Email: "",
    //         Password: "",
    //     }
    // }

    // //функція яка викликається під час відправки форми
    // onSubmitHandler = (e) => {
    //     e.preventDefault();
    //     var errors = validatonFields(this.state); //викликаємо валідатор і передаємо стейт from './Validation'
    //     const isValid = Object.keys(errors).length === 0;   // створюємо змінну isValid і приводимо її до буля перевіркою чи є в нашому масиві помилки
    //                                                         // якщо значення буде не 0 тоді в нас є декілька помилок 
    //     if (isValid) // перевіряємо чи значення валідне якщо так тоді відправляємо дані на сервер
    //     {
    //         alert(this.state); // типу сервер
    //     }
    //     else // якщо значення не валідні
    //     {
    //         this.setState({errors: errors, isValidation: true}); // рендеримо нашу сторінку знову. І надсилаємо туди наші помилки 
    //     }
    // }
    
    // // функція яку викликає кожен інпут викликається при зміні значень в інпуті
    // onChangeHandler = (e) => {
    //     const {name, value} = e.target; // витягуємо імя і значення з інпута 
    //     const {isValidation} = this.state; // втановюємо значення isValidation (тру якщо форма вже надсилалася)

    //     if(isValidation) // якщо значення тру
    //     {
    //         const data = {...this.state, [name]: value} // розширяємо наш стейт і присвоюємо значення
    //         const errors = validatonFields(data) // надсилаєм дані щоб перевірити валідність тут дані перевіряються динамічно
    //         this.setState({ [name]: value, errors: errors }); // повторно рендерим з первіреними даними
    //     }
    //     else
    //     {
    //         this.setState({ [name]: value }) // повторно рендерим наш інпут з новим значенням
    //     }
    // }


    // render() {
    //     const {errors} = this.state;
    //     return (
    //         <div className="row">
    //             <h1 className="text-center">Вхід на сайт</h1>
    //             <div className="offset-md-3 col-md-6">
    //                 <form onSubmit={this.onSubmitHandler}>

    //                     <InputTextField  //викликали генератор інпута '../../common/InputTextField';
    //                         field ="Email"
    //                         label ="Пошта"
    //                         value ={this.state.Email}
    //                         error= {errors.Email}
    //                         onChange={this.onChangeHandler}
    //                     />

    //                     <InputTextField  //викликали генератор інпута '../../common/InputTextField';
    //                         field ="Password"
    //                         label ="Пароль"
    //                         value ={this.state.Password}
    //                         error= {errors.Password}
    //                         onChange={this.onChangeHandler}
    //                         type="password"
    //                     />

    //                     <button type="submit" className="btn btn-dark">Вхід</button>
    //                 </form>
    //             </div>

    //         </div>
    //     )
    // }
}

export default LoginPage
