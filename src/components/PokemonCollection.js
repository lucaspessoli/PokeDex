import { useEffect, useState } from "react"
import axios from "axios";

function PokemonCollection(){

    const [exibicoes, SetExibicoes] = useState([]);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10`)
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
                SetExibicoes(tempExibicoes);
              });
          });
      }, []);
      

    return(
        <div>
        <div>
            <p>salve</p>
        </div>
        <div className="roli">
            {
            exibicoes.map((poke, index) => {
                return(
                <div className="subCard">
                <div className="header">
                <div>
                <span className="tag">
                {
                    poke.types[0].type.name === "water"
                        ?<p>agua</p>
                        :poke.types[0].type.name === "fire"
                            ?<p>fogo</p>
                            : poke.types[0].type.name === "grass"
                                ?<p>grama</p>
                                :poke.types[0].type.name === "bug"
                                    ?<p>inseto</p>
                                    : null
                }
                <img src={poke.sprites.front_default} style={{backgroundColor: "black"}}/>
                </span>
                </div>
                </div>
                </div>
                )
            })
            }
        </div>
        </div>
    )
}

export default PokemonCollection