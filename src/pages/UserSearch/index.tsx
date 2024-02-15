import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  usuario: string;
};

type Info = {
  avatar_url: string;
  html_url: string;
  followers: string;
  location: string;
  name: string;
};

const UserSearch = () => {
  const [info, setInfo] = useState<Info>();

  const [formData, setFormData] = useState<FormData>({
    usuario: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
    // console.log("Mudou para: " + event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .get(`https://api.github.com/users/${formData.usuario}`)
      .then((response) => {
        setInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setInfo(undefined);
        console.log(error);
      });
  };

  return (
    <div className="user-search-container">
      <div className="container search-container">
        <h1>Encontre um perfil Github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>

      {info && (
        <>
          <div className="info-container">
            <div className="img-container">
              <img className="avatar" src={info?.avatar_url} alt={info.name} />
            </div>

            <div className="info-details-container">
              <h5>Informações</h5>
          
              <ResultCard title="Perfil:" description={info.html_url} />
              <ResultCard title="Seguidores:" description={info.followers} />
              <ResultCard title="Localidade:" description={info.location} />
              <ResultCard title="Nome:" description={info.name} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSearch;
