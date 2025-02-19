// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="features-02-area pb-90 pt-50">
        <div className="container">
            <div className="row">        
                <div className="col-xl-10 col-lg-10 mx-auto text-center">
                    <img className="mx-auto" src="/assets/images/404-02.png"/>
                    <h1 className="text-titles">Oops!</h1>
                    <br/>
                    <p>La página que buscas no se encuentra disponible. <br/> Revisa el URL o vuelve a la pagina de inicio.</p>
                    <br/>
                    <Link to="/" className="rts-btn btn-primary">
                    Regresar al inicio
                    </Link>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NotFound;
