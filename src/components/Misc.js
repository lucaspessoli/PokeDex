import axios from "axios";
import { useState, useEffect } from "react";


function Misc(){

    const [buscaPoke, setBuscaPoke] = useState();
    const [exibir, setExibir] = useState(false);
    const [pokeObj, setPokeObj] = useState({nome: '', image: ""})

    function BuscarImagemPokemon(){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${buscaPoke}`)
        .then((response)=>{
            const data = response.data
            var pokeImage =  data.sprites.front_default;
            var pokeName = data.forms[0].name;
            console.log(response)
            setExibir(true);
            setPokeObj({nome: pokeName, image: pokeImage});         
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