import { useEffect, useState } from "react"
import axios from "axios";

function PokemonCollection(){

    const [exibicoes, SetExibicoes] = useState([]);
    const [limite, SetLimite] = useState(40);

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

    //   function AvancarLista(){
    //     SetLimite(prevLimite => prevLimite + 10);
    //     axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limite}`)
    //     .then((response) => {
    //       const tempExibicoes = [];
    //       const requests = response.data.results.map((pk) => {
    //           return axios.get(pk.url)
    //               .then((r) => {
    //                   tempExibicoes.push(r.data);
    //                   console.log(r.data)
    //         });
    //       });
    //       Promise.all(requests)
    //         .then(() => {
    //           tempExibicoes.sort((a,b) => a.id - b.id); //Ordena o array pelo id dos pokemons, pois na Promise a ordem pode ser quebrada, então é necessario sort
    //           SetExibicoes(tempExibicoes);
    //         });
    //     });
    //   }
      

    return(
        <div>
        <div>
            <h3>ENCONTRE SEU POKEMON!</h3>
        </div>
        <div className="roli">
            <button>VOLTAR</button>
            {
            exibicoes.map((poke, index) => {
                return(
                <div className="subCard">
                <div className="header">
                <div>
                <span className="tag">
                {
                    poke.types[0].type.name === "water"
                        ?
                        <>
                        <p>#{poke.id}</p>
                        <img src={poke.sprites.front_default} style={{backgroundColor: 'rgb(125, 242, 255)'}}/>
                        </>
                        :poke.types[0].type.name === "fire"
                            ?
                            <>
                            <p>#{poke.id}</p>
                            <img src={poke.sprites.front_default} style={{backgroundColor: 'rgb(255, 89, 89)'}}/>
                            </>
                            : poke.types[0].type.name === "grass"
                                ?
                                <>
                                <p>#{poke.id}</p>
                                <img src={poke.sprites.front_default} style={{backgroundColor: 'rgb(174, 240, 149)'}}/>
                                </>
                                :poke.types[0].type.name === "bug"
                                    ?
                                    <>
                                    <p>#{poke.id}</p>
                                    <img src={poke.sprites.front_default} style={{backgroundColor: 'rgb(153, 96, 63)'}}/>
                                    </>
                                        :poke.types[0].type.name === "normal"
                                        ?
                                        <>
                                        <p>#{poke.id}</p>
                                        <img src={poke.sprites.front_default}/>
                                        </>
                                            :poke.types[0].type.name === "poison"
                                            ?
                                            <>
                                            <p>#{poke.id}</p>
                                            <img src={poke.sprites.front_default} style={{backgroundColor: 'rgb(25, 69, 33)'}}/>
                                            </>
                                                :poke.types[0].type.name === "fairy"
                                                ?
                                                <>
                                                <p>#{poke.id}</p>
                                                <img src={poke.sprites.front_default} style={{backgroundColor: 'rgb(231, 133, 255)'}}/>
                                                </>
                                                    :poke.types[0].type.name === "electric"
                                                    ?
                                                    <>
                                                    <p>#{poke.id}</p>
                                                    <img src={poke.sprites.front_default} style={{backgroundColor: 'rgb(250, 255, 97)'}}/>
                                                    </>
                                                        :poke.types[0].type.name === "ground"
                                                        ?
                                                        <>
                                                        <p>#{poke.id}</p>
                                                        <img src={poke.sprites.front_default} style={{backgroundColor: 'rgb(93, 94, 51)'}}/>
                                                        </>
                                                        :null

                }
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