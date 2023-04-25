import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast.success("Pokemon encontrado no sistema!")
        })
        .catch(e => toast.error("Pokemon não encontrado , você escreveu corretamente?"))
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
                            <div class="card">
                                <div class="card-image"><img src={pokeObj.image}/></div>
                                <div class="category"> <p>{pokeObj.nome}</p> </div>
                                <div class="heading">
                                    {
                                        pokeObj.abilities[0].map((e, index)=>{
                                            return <p>Habilidade {index + 1}: {(e.ability.name).charAt(0).toUpperCase() + (e.ability.name).slice(1)}</p>
                                        })
                                    }
                                    <div class="author"> By <span class="name">Abi</span> 4 days ago</div>
                                </div>
                                </div>
                        </div>
                ) : (
                    null
                ))
            }
            <ToastContainer />
        </div>
    )
}

export default Misc