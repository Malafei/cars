import React, {useRef, useState} from 'react'
import validatonFields from './Validation';
import {Formik, Form} from 'formik';
import MyTextInput from "../../common/MyTextInput";
import MyPhotoInput from '../../common/MyPhotoInput';
import http from "../../../http_common";
import {useHistory} from 'react-router';

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

    //функція яка викликається під час події он сабміт (умовно відправляє дані на сервер)
    const onSubmitHandler=(values) =>
    {
        const formData = new FormData();
        Object.entries(values).forEach
        (
            ([key, value]) => formData.append(key, value)
        );

        http.post("api/acount/register", formData,
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

            //const {errors} = bad.response.data;
            // if(errors.email) {
            // errors.email.forEach(message => {
            //         formikRef.current.setFieldError("Email" ,message);
            //     });
            // }

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


    //створюємо обєкт стейт де описуємо наші поля
    // state = {
    //     Email: '',
    //     Phone: '',
    //     Login: '',
    //     Password: '',
    //     ConfirmPassword: '',
    //     Photo: '',
    //     BasePhoto: '',
    //     isValidation: false,

    //     // добавляємо обєкт еррори
    //     errors: {
    //         Email: "",
    //         Phone: "",
    //         Login: "",
    //         Password: "",
    //         ConfirmPassword: "",
    //         Photo: ""
    //     }
    // }


    // //функція яка викликається під час відправки форми
    // onSubmitHandler = (e) => {

    //     e.preventDefault();

    //     var errors = validatonFields(this.state); //викликаємо валідатор і передаємо стейт from './Validation'
    //     const isValid = Object.keys(errors).length === 0;   // створюємо змінну isValid і приводимо її до буля перевіркою чи є в нашому масиві помилки
    //     // якщо значення буде не 0 тоді в нас є декілька помилок 
    //     if (isValid) // перевіряємо чи значення валідне якщо так тоді відправляємо дані на сервер
    //     {
    //         alert(this.state); // типу сервер
    //     }
    //     else // якщо значення не валідні
    //     {
    //         this.setState({ errors: errors, isValidation: true }); // рендеримо нашу сторінку знову. І надсилаємо туди наші помилки 
    //     }

    // }

    // // функція яку викликає кожен інпут викликається при зміні значень в інпуті
    // onChangeHandler = (e) => {
    //     const { name, value } = e.target; // витягуємо імя і значення з інпута 
    //     const { isValidation } = this.state; // втановюємо значення isValidation (тру якщо форма вже надсилалася)]
    //     if (isValidation) // якщо значення тру
    //     {
    //         const data = { ...this.state, [name]: value }; // розширяємо наш стейт і присвоюємо значення
    //         console.log(data);
    //         const errors = validatonFields(data) // надсилаєм дані щоб перевірити валідність тут дані перевіряються динамічно
    //         this.setState({ [name]: value, errors: errors }); // повторно рендерим з первіреними даними
    //     }
    //     else {
    //         this.setState({ [name]: value }) // повторно рендерим наш інпут з новим значенням
    //     }
    // }


    // onChangePhoto = (e) => {
    //     const files = e.target.files;
    //     const { value } = e.target;
    //     console.log(value);
    //     var Photobase;
    //     if (files && files[0]) { // перевіряємо чи файл обрано
    //         const file = files[0]; // присваюємо
    //         if (file.type.match(/^image\//)) { // перевіряємо чи тип файлу фото
    //             const reader = new FileReader(); // створюємо змінну
    //             console.log(reader.result);
    //             reader.onload = function () { // після загрузки файлу виконуємо наступний код....

    //                 // cука воно тільки тут працює
                    

    //             }
    //             reader.readAsDataURL(file); //використовується для читання File. Коли операція закінчиться
    //         }
    //     }
    //     const { isValidation } = this.state; // втановюємо значення isValidation (тру якщо форма вже надсилалася)
    //     if (isValidation) // якщо значення тру
    //     {

    //         const data = { ...this.state, Photo: value } // розширяємо наш стейт і присвоюємо значення
    //         const errors = validatonFields(data) // надсилаєм дані щоб перевірити валідність тут дані перевіряються динамічно

    //         this.setState({ Photo: value, errors: errors }); // повторно рендерим з первіреними даними
    //         this.setState({ BasePhoto: Photobase })
    //     }
    //     else {
    //         this.setState({ BasePhoto: Photobase })
    //         this.setState({ Photo: value }) // повторно рендерим наш інпут з імям Photo з новим значенням
    //     }
    // }


    // render() {
    //     const { errors } = this.state;
    //     return (
    //         <div className="row">
    //             <h1 className="text-center">Реєстрація</h1>
    //             <div className="offset-md-3 col-md-6">
    //                 <form onSubmit={this.onSubmitHandler}>

    //                     <InputTextField //викликали генератор інпута '../../common/InputTextField';
    //                         field="Email"
    //                         label="Пошта"
    //                         value={this.state.Email}
    //                         error={errors.Email}
    //                         onChange={this.onChangeHandler}
    //                     />

    //                     <InputTextField //викликали генератор інпута '../../common/InputTextField';
    //                         field="Phone"
    //                         label="Номер телефону"
    //                         value={this.state.Phone}
    //                         error={errors.Phone}
    //                         onChange={this.onChangeHandler}
    //                         type="number"
    //                         placeholder="+38(XXX)-XXX-XX-XX"
    //                     />

    //                     <InputTextField //викликали генератор інпута '../../common/InputTextField';
    //                         field="Login"
    //                         label="Логін"
    //                         value={this.state.Login}
    //                         error={errors.Login}
    //                         onChange={this.onChangeHandler}
    //                         type="text"
    //                     />

    //                     <InputTextField //викликали генератор інпута '../../common/InputTextField';
    //                         field="Password"
    //                         label="Пароль"
    //                         value={this.state.Password}
    //                         error={errors.Password}
    //                         onChange={this.onChangeHandler}
    //                         type="password"
    //                     />

    //                     <InputTextField //викликали генератор інпута '../../common/InputTextField';
    //                         field="ConfirmPassword"
    //                         label="Повторіть пароль"
    //                         value={this.state.ConfirmPassword}
    //                         error={errors.ConfirmPassword}
    //                         onChange={this.onChangeHandler}
    //                         type="password"
    //                     />

    //                     <div className="mb-3">
    //                         <img src={this.state.BasePhoto} id="BasePhoto" name="BasePhoto" alt="Твоє фото"></img>


    //                         <input type="file"
    //                             className={classnames("form-control",
    //                                 { "is-invalid": errors.Photo },
    //                                 { "is-valid": errors.Photo == undefined }
    //                             )}
    //                             id="Photo"
    //                             name="Photo"
    //                             value={this.state.Photo}
    //                             onChange={this.onChangePhoto}
    //                             placeholder="Натисніть для вибору фото"
    //                         />
    //                         {!!errors.Photo && <div className="invalid-feedback">{errors.Photo}</div>}
    //                     </div>

    //                     <button type="submit" className="btn btn-dark">Реєстрація</button>
    //                 </form>
    //             </div>

    //         </div>
    //     )
    // }
}

export default RegisterPage;


