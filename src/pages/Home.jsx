import React  from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useNavigate } from 'react-router-dom'; 

const Home = () => {  
    const navigate = useNavigate();  
    const handleClick = () => {
        navigate('/logs'); // Redirige a la página de logs
      }; 
    
    return (
        <div className="d-flex justify-content-center align-items-center bg-light mt-3 pt-2 mb-4">
      <div className="card shadow-lg p-6" style={{ width: '600px', textAlign: 'center', position: 'relative' }}>
        <img 
          src="https://ambystomadev.uteq.edu.mx/Content/assets/Logo_uteq_color.png" 
          alt="UTEQ Logo" 
          style={{ position: 'absolute', top: '40px', left: '50px', width: '250px' }}
        />
        <div className="card-body" style={{marginTop: '160px'}}>
          <h2>Universidad Tecnológica de Querétaro</h2>
          <br />
          <h4>Seguridad Informática</h4>
          <br />
          <h5>“Conceptos Básicos de la Seguridad”</h5>
          <br />
          <h5>Grupo: IDSG11</h5>
          <br />
          <h5>Alumn@: Salinas Jiménez María Dolores</h5>
          <br />
          <h5>Grado: Técnico Superior Universitario (TSU)</h5>
          <br />
          <h5 style={{marginBottom: '200px'}}>Maestro: Agustín Buenrostro Rico</h5>
          <hr style={{height:'3px', backgroundColor: 'black', border: 'none' }} />
          <h4 className="mt-3" style={{textAlign: 'center', paddingTop: '100px'}}>Descripción de la app:</h4> 
          <p className="text-justify" style={{textAlign: 'justify', paddingBottom: '300px', paddingLeft: '30px', paddingRight: '30px'}}>
            Esta aplicación web está diseñada para gestionar el acceso seguro de usuarios mediante autenticación JWT con MFA y registrar logs detallados de actividad en una base de datos.
            Cuenta con dos servidores backend que manejan las mismas funcionalidades, con la diferencia de que uno incorpora un sistema de Rate Limit para limitar solicitudes, mientras que el otro no.
            Además, el sistema incluye un frontend interactivo con visualización de datos y métricas de logs.
          </p>
          <button className="btn btn-warning mt-3" type="button" onClick={handleClick}>
            Ver Logs
          </button>
        </div>
      </div>
    </div>
      );
};

export default Home;
