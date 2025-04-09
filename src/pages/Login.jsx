import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Login = () => { 
    const [idUs, setIdUs] = useState("");
    const [email, setEmail ] = useState("");
    const [username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");
    const [nombre, setNombre ] = useState("");
    const [app, setApp ] = useState("");
    const [apm, setApm ] = useState("");
    const [grupo, setGrupo ] = useState("");
    const [secretUrl, setSecretUrl] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("login"); 

    const handleRegister = async (e) => { 
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5001/api/register", {
                email,
                username,
                nombre,
                app,
                apm,
                grupo,
                password,
            });
            Swal.fire({
                title: "¡Éxito!",
                text: "El usuario ha sido registrado correctamente",
                icon: "success",
                confirmButtonText: "OK"
            });
            setSecretUrl(generateOtpAuthUrl(res.data.mfaSecret));
            setStep("qr"); 
            cleanData(e);
        }catch (error) {
            console.error("Error al registrarte: ", error);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al registrarte.",
              icon: "error",
              confirmButtonText: "OK"
            });
        }

    };

    const generateOtpAuthUrl = (secret) => {
        return `otpauth://totp/MyApp?secret=${secret}&issuer=MyApp`;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5001/login", { 
                email,
                password,
            });
            setIdUs(res.data.userId);
            console.log("ID del usuario:", idUs);
            Swal.fire({
                title: "¡Éxito!",
                text: "El usuario ha sido registrado correctamente",
                icon: "success",
                confirmButtonText: "OK"
            });
            if (res.data.requiresMFA) setStep("otp");
            cleanData(e);
        }catch (error) {
            console.error("Error al logetare: ", error);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al logearte.",
              icon: "error",
              confirmButtonText: "OK"
            });
        }


    };

        console.log("Token OTP:", otp);
        const verifyOTP = async (e) => {
            e.preventDefault();
            try {
              const res = await axios.post("http://localhost:5001/verify-otp", {
                email,
                token: otp,
              });
          
              if (res.data.success) {
                Swal.fire({
                  title: "¡Éxito!",
                  text: "Autenticado!",
                  icon: "success",
                  confirmButtonText: "OK"
                }).then(()=> {
                    window.location.href = `/home?idUs=${idUs}`;
                });  
              } else {
                Swal.fire({
                  title: "¡Nooo!",
                  text: "Código inválido!",
                  icon: "error",
                  confirmButtonText: "OK"
                });
              }
              
              cleanData(e);
            } catch (error) {
              console.error("Error al verificar OTP:", error);
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al verificar el OTP",
                icon: "error",
                confirmButtonText: "OK"
              });
            }
          };
          


    const cleanData = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        setUsername("");
        setNombre("");
        setApp("");
        setApm("");
        setGrupo("");
        setOtp("");
    }
    
    return (
        <div className ="card" style = {{ width: '450px', marginLeft: '35%', marginTop: '6%' , marginBottom: '10%'}}>
            <div className ="card-body">   
                <h1 className ="card-title text-center">Autenticación con QR</h1>
                {step === "login" && (
                    <form onSubmit={handleLogin}>
                    <h1 className ="card-subtitle mb-2 text-body-secondary text-center">Login</h1>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email: </span>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Correo"
                        value={email}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Password: </span>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <button type="submit" style = {{ marginLeft: '110px'}} className="btn btn-success">Aceptar</button> 
                    <button className="btn btn-primary" style = {{ marginLeft: '50px'}} onClick={() => setStep("registro")}>Registro</button>
                    </form>
                )}

                {step === "registro" && (
                    <form onSubmit={handleRegister}>
                    <h1 className ="card-subtitle mb-2 text-body-secondary text-center">Registro</h1>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email: </span>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Correo"
                        value={email}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Username: </span>
                    <input
                        className="form-control"
                        type="texto"
                        placeholder="Usuario"
                        value={username}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Nombre: </span>
                    <input
                        className="form-control"
                        type="texto"
                        placeholder="Nombre del alumno"
                        value={nombre}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Apellido paterno: </span>
                    <input
                        className="form-control"
                        type="texto"
                        placeholder="Apellido 1"
                        value={app}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setApp(e.target.value)}
                        required
                    />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Apellido materno: </span>
                    <input
                        className="form-control"
                        type="texto"
                        placeholder="Apellido 2"
                        value={apm}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setApm(e.target.value)}
                        required
                    />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Grupo: </span>
                    <input
                        className="form-control"
                        type="texto"
                        placeholder="Grupo"
                        value={grupo}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setGrupo(e.target.value)}
                        required
                    />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Password: </span>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <button className="btn btn-primary" style = {{ marginLeft: '110px'}} type="submit">Aceptar</button>
                    <button className="btn btn-success" style = {{ marginLeft: '50px'}} onClick={() => setStep("login")}>Login</button>
                    </form>
                )}
            
                {step === "qr" && secretUrl && (
                    <div className="input-group mb-2 d-flex flex-column align-items-center">
                        <h1 className ="card-subtitle  mb-2 text-body-secondary text-center">Escanear</h1>
                        <QRCodeSVG value={secretUrl} />
                        <p className="card-text text-center">Escanea este QR con Google Authenticator</p>
                        <button className="btn btn-success mt-2" onClick={() => setStep("login")}>Login</button>
                    </div>
                )}
            
                {step === "otp" && (
                    <form onSubmit={verifyOTP}>
                    <h1 className ="card-subtitle  mb-2 text-body-secondary text-center">Código OTP</h1>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email: </span>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Correo"
                        value={email}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Código OTP: </span>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Código de Authenticator"
                        value={otp}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    </div> 
                    <button className="btn btn-warning" style = {{ marginLeft: '110px'}}  type="submit">Verificar</button>
                    <button className="btn btn-success" style = {{ marginLeft: '50px'}} onClick={() => setStep("login")}>Login</button>
                    </form>
                )}



            </div> 
        </div>
      );
};

export default Login;

