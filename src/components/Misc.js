import axios from "axios";
import { useState, useEffect } from "react";


function Misc(){

    const [buscaPoke, setBuscaPoke] = useState();
    const [exibir, setExibir] = useState(false);
    const [pokeObj, setPokeObj] = useState({nome: '', image: "", abilities: []})

    function BuscarImagemPokemon(){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${buscaPoke}`)
        .then((response)=>{
            const data = response.data
            var pokeImage =  data.sprites.front_default;
            var pokeName = data.forms[0].name;
            var abil = [data.abilities]
            console.log(data)
            setExibir(true);
            setPokeObj({nome: pokeName, image: pokeImage, abilities: abil});        
        })
    }
    return(
        <div>
            <input id="oi" type="text" placeholder="Insira o nome do pokemon" onChange={(e => setBuscaPoke(e.target.value))}/>
            <button onClick={BuscarImagemPokemon}>Buscar</button>
            {
                (exibir ? (
                    <div>
                        <p className="pokeP">{pokeObj.nome}</p>
                        {console.log(pokeObj.abilities)}
                        {
                            pokeObj.abilities[0].map((e, index) =>{
                                // return <p key={index}>{e.ability.name}</p> return usado dentro de um map no html pra retornar apenas um elemento
                                return ( // return entre parentes pra envolver mais de um elemento. (bom usar a key na div)
                                <div key={index}>
                                    <p>Habilidade {index + 1}: {(e.ability.name).charAt(0).toUpperCase() + (e.ability.name).slice(1)}</p>
                                </div>
                                )

                            })
                        }
                        <img src={pokeObj.image} className="pokeI"/>
                    </div>
                ) : (
                    null
                ))
            }
        </div>
    )
}

export default Misc