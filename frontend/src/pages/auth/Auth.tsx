import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Auth.css';
import { useLogin } from '../../queries/auth/useLogin';

export default function Auth() {

  const tipo = useParams().tipo;
  const [user, setUsuari] = useState({ username: "", contrasenya: "", email: "" });
  const [error_sesio, setErrorSesio] = useState({ error: false, data: "" });
  const navigate = useNavigate();
  // const { mutate, error, data } = useLogin()
  const { mutateAsync} = useLogin()
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
          <label>Contrasenya</label> <input type='password' value={user.contrasenya} onChange={(e) => setUsuari({ ...user, contrasenya: e.target.value })} />
          {error_form}
          <button onClick={submit}>Enviar</button>
        </div>
      </>
    )
  }
  async function submit() {

    try {
      let data = await mutateAsync({ user, tipo });
      console.log("DATA ", await data);

      setErrorSesio({ error: false, data: "" });
      navigate("/");
      // window.location.reload();

    } catch (error:any) {
      console.log("ERROR res", error);

      if(error.response.data.tipo == 'duplicated'){
        setErrorSesio({ error: true, data: `Ya existe un ${error.response.data.error}` });
      }else{
        setErrorSesio({ error: true, data: error.response.data.error });
      }

    }
  }

}


