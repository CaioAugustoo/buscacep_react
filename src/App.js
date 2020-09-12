import React, { useState, useRef } from "react";

const App = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const inputBusca = useRef();

  const handleSubmit = evt => {
    evt.preventDefault();
    async function fetchCep() {
      setLoading(true);
      const response = await fetch(
        `https://viacep.com.br/ws/${inputBusca.current.value}/json/`
      );
      const json = await response.json();
      setData(json);
      setLoading(false);
    }
    fetchCep();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Digite um CEP"
          required
          ref={inputBusca}
          minLength="8"
        />
      </form>
      
      {/* Exibe se estiver carregando */}
      {loading && <p>Carregando...</p>}
      
      {/* Exibe se não estiver carregando, se não retornar erro, se tiver algum dado */}
      {!loading && !data.erro && data && (
        <div>
          <p>Bairro: {data.bairro}</p>
          <p>Cep: {data.cep}</p>
          <p>Complemento: {data.complemento}</p>
          <p>IBGE: {data.ibge}</p>
          <p>Localidade: {data.localidade}</p>
          <p>Logradouro: {data.logradouro}</p>
          <p>Siafi: {data.siafi}</p>
          <p>UF: {data.uf}</p>
        </div>
      )}

      {/* Exibe se retornar o erro */}
      <p
        style={{
          display: data.erro ? "block" : "none",
          color: data.erro ? "red" : "transparent",
        }}
      >
        Oops... Parece que você inseriu um cep incorreto.
      </p>
    </div>
  );
};

export default App;
