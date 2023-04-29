import { useEffect, useState } from "react"
import axios from "axios";

function PokemonCollection(){

    const [exibicoes, SetExibicoes] = useState([]);
    const [limite, SetLimite] = useState(40);

    const typeColors = {
        water: 'rgb(125, 242, 255)',
        fire: 'rgb(255, 89, 89)',
        grass: 'rgb(174, 240, 149)',
        bug: 'rgb(153, 96, 63)',
        normal: '',
        poison: 'rgb(25, 69, 33)',
        fairy: 'rgb(231, 133, 255)',
        electric: 'rgb(250, 255, 97)',
        ground: 'rgb(93, 94, 51)'
      };
      
    //   const color = typeColors[poke.types[0].type.name];

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=55&limit=${limite}`)
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
        SetLimite(prevLimite => prevLimite + 10);
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limite}`)
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
            <button>VOLTAR</button>
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
            {/* <button onClick={AvancarLista}>Avançar</button> */}
        </div>
        </div>
    )
}

export default PokemonCollection