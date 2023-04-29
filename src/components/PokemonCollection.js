import { useEffect, useState } from "react"
import axios from "axios";

function PokemonCollection(){

    const [exibicoes, SetExibicoes] = useState([]);
    const [taxa, SetTaxa] = useState(10);

    const typeColors = {
        water: 'rgb(125, 242, 255)',
        fire: 'rgb(255, 89, 89)',
        grass: 'rgb(174, 240, 149)',
        bug: 'rgb(153, 96, 63)',
        normal: '',
        poison: 'rgb(25, 69, 33)',
        fairy: 'rgb(231, 133, 255)',
        electric: 'rgb(250, 255, 97)',
        ground: 'rgb(93, 94, 51)',
        ghost: 'rgb(128, 128, 128)',
        rock: 'rgb(36, 27, 25)',
        fighting: 'rgb(255, 147, 46)',
        normal: 'rgb(255,255,0)',
        psychic: 'rgb(174, 61, 255)',
        dragon: 'rgb(194, 74, 0)',
        ice: 'rgb(181, 248, 255)',
        dark: 'rgb(24, 6, 26)',
        steel: 'rgb(135, 132, 135)'
      };
      
    //   const color = typeColors[poke.types[0].type.name];

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${taxa}&limit=10`)
          .then((response) => {
            const tempExibicoes = [];
            const requests = response.data.results.map((pk) => {
                return axios.get(pk.url)
                    .then((r) => {
                        tempExibicoes.push(r.data);
                        console.log(r.data)
              });
            });
            Promise.all(requests)
              .then(() => {
                tempExibicoes.sort((a,b) => a.id - b.id); //Ordena o array pelo id dos pokemons, pois na Promise a ordem pode ser quebrada, então é necessario sort
                SetExibicoes(tempExibicoes);
              });
          });
      }, []);

      function AvancarLista(){
        SetTaxa(prevTaxa => prevTaxa + 10);
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${taxa}&limit=10}`)
        .then((response) => {
          const tempExibicoes = [];
          const requests = response.data.results.map((pk) => {
              return axios.get(pk.url)
                  .then((r) => {
                      tempExibicoes.push(r.data);
                      console.log(r.data)
            });
          });
          Promise.all(requests)
            .then(() => {
              tempExibicoes.sort((a,b) => a.id - b.id); //Ordena o array pelo id dos pokemons, pois na Promise a ordem pode ser quebrada, então é necessario sort
              SetExibicoes(tempExibicoes);
            });
        });
      }

      function VoltarLista(){
        SetTaxa(prevTaxa => prevTaxa - 10);
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${taxa}&limit=10}`)
        .then((response) => {
          const tempExibicoes = [];
          const requests = response.data.results.map((pk) => {
              return axios.get(pk.url)
                  .then((r) => {
                      tempExibicoes.push(r.data);
                      console.log(r.data)
            });
          });
          Promise.all(requests)
            .then(() => {
              tempExibicoes.sort((a,b) => a.id - b.id); //Ordena o array pelo id dos pokemons, pois na Promise a ordem pode ser quebrada, então é necessario sort
              SetExibicoes(tempExibicoes);
            });
        });
      }
      

    return(
        <div>
        <div>
            <h3>ENCONTRE SEU POKEMON!</h3>
        </div>
        <div className="roli">
            <button onClick={VoltarLista}>VOLTAR</button>
                {
                    exibicoes.map((poke, index) => {
                        return (
                            <div className="subCard">
                                <div className="header">
                                    <div>
                                        <span className="tag">
                                            <>
                                                <p>#{poke.id}</p>
                                                <img
                                                    src={poke.sprites.front_default}
                                                    style={{ backgroundColor: typeColors[poke.types[0].type.name]}}
                                                />
                                            </>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            <button onClick={AvancarLista}>Avançar</button>
        </div>
        </div>
    )
}

export default PokemonCollection