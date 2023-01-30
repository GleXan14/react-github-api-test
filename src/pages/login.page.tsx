
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactLogo from '../assets/svg/logo.svg';
import { IAuth } from '../models/auth.model';
import Utility from '../utils/utility';

function LoginPage(){

    
    const { register, handleSubmit, formState: { errors }} = useForm<IAuth>();


    const submitData: SubmitHandler<IAuth> = (formData) => {
        localStorage.setItem(Utility.LOCAL_STORAGE_AUTH_ITEM, JSON.stringify(formData));
        window.location.reload();
        //navigate("/home", {replace: true});
    }

    return (
        <div className="login-container">
            <div className="login-background"></div>
            <div className="login">
                <img src={ReactLogo} className="login-logo" alt='logo'></img>
                <form onSubmit={handleSubmit(submitData)}>
                    <div className='input-container'>
                        <input 
                        type="text"
                        {...register("email", {required:true})}
                        placeholder="Email"
                        aria-invalid={!!errors.email}></input>
                        {errors.email?.type === 'required' && <p role="alert">Email is required.</p>}
                    </div>

                    <div className='input-container'>
                        <input 
                        type="password"
                        placeholder="Contraseña"
                        {...register("password", {required:true, minLength: 8})}
                        aria-invalid={!!errors.password}
                        ></input>
                        {errors.password?.type === 'required' && <p role="alert">Password is required.</p>}
                        {errors.password?.type === 'minLength' && <p role="alert">Password needs 8 characters minimum.</p>}
                        
                    </div>
                    
                    <div className='submit-container'>
                        <button type="submit" className='btn-submit'>
                            ACCEDER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;