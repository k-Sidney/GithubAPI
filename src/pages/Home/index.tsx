import { Link } from 'react-router-dom';

import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
        
      <div className="home-welcome-container">
        <h1>Desafio Github API</h1>
        <h6>DevSuperior - Escola de programação</h6>
      </div>

      <Link to="/cepsearch">
        <button className="btn btn-primary btn-lg start-button">Começar</button>
      </Link>
    </div>
  );
};

export default Home;
