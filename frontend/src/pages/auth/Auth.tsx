import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Auth.css';
import { useLogin, useRegister } from '../../mutations/auth/useLogin';
import { toast } from 'sonner';

export default function Auth() {

    const tipo = useParams().tipo;
    const [user, setUsuari] = useState({ username: "", password: "", email: "" });
    const [error_sesio, setErrorSesio] = useState({ error: false, data: "" });
    const navigate = useNavigate();
    // const { mutate, error, data } = useLogin()
    const { mutateAsync: login } = useLogin();
    const { mutateAsync: register } = useRegister();
    return (
        <>
            <div className="auth-page">
                <div className="formulari">
                    <div>
                        <h1 style={{ marginTop: 0 }}>{tipo}</h1>
                        {form()}
                    </div>
                </div>
            </div>
        </>
    )



    function form() {
        let email_form;
        let error_form = (<></>);
        if (tipo === "register") {
            email_form = (<>
                <label>Email</label>
                <input value={user.email} onChange={(e) => setUsuari({ ...user, email: e.target.value })} type='email' /> </>);
        } else {
            email_form = (<></>);
        }
        if (error_sesio.error) {
            error_form = (<p className='error'>{error_sesio.data}</p>);
        }

        return (
            <>
                <div className='form-auth'>
                    <label>Usuari</label> <input type='text' value={user.username} onChange={(e) => setUsuari({ ...user, username: e.target.value })} />
                    {email_form}
                    <label>Contrasenya</label> <input type='password' value={user.password} onChange={(e) => setUsuari({ ...user, password: e.target.value })} />
                    {error_form}
                    <button onClick={submit}>Enviar</button>
                </div>
            </>
        )
    }
    async function submit() {

        try {
            if (tipo === "login") {
                await login(user);
                setErrorSesio({ error: false, data: "" });
                navigate("/");
            } else {
                await register(user);
                setErrorSesio({ error: false, data: "" });
                toast.success("Usuario registrado se te ha enviado un correo para confimar tu identidad")
                navigate("/");
            }

        } catch (error: any) {
            console.log("ERROR res", error);

            const resData = error.response?.data || {};

            if (resData.tipo === 'duplicated') {
                setErrorSesio({ error: true, data: `Ya existe un ${resData.error}` });
            } else if (resData.errors) {
                setErrorSesio({ error: true, data: resData.errors.join(', ') });
            } else {
                setErrorSesio({ error: true, data: resData.error?.message || resData.error || "Error inesperado" });
            }
        }
    }

}


