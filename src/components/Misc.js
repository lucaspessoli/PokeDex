import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Misc(){

    const [buscaPoke, setBuscaPoke] = useState();
    const [exibir, setExibir] = useState(false);
    const [pokeObj, setPokeObj] = useState({id: 0, nome: '', image: "", abilities: [], style: [], desc: ""})

    function BuscarImagemPokemon(){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${buscaPoke}`)
        .then((response)=>{
            const data = response.data
            var pokeImage =  data.sprites.front_default;
            var pokeName = data.forms[0].name;
            var abil = [data.abilities]
            var estilo = [data.types]
            var idP = [data.id]
            var desc = [data]
            console.log(data)
            setExibir(true);
            setPokeObj({id: idP, nome: pokeName, image: pokeImage, abilities: abil, style: estilo});
            toast.success("Pokemon encontrado no sistema!")
        })
        .catch(e => toast.error("Pokemon não encontrado , você escreveu corretamente?"))
    }

    return(
        <div>
            <input id="oi" type="text" placeholder="Insira o nome do pokemon" onChange={(e => setBuscaPoke(e.target.value))}/><br/>
            <button onClick={BuscarImagemPokemon}>Buscar</button>
            {
                (exibir ? (
                    <div class="card">
                            <div class="header">
                                <div class="image">
                                    <span class="tag"><img src={pokeObj.image} /></span>
                                </div>
                            </div>
                            <div class="info">
                                {/* <a rel="noopener noreferrer" href="#" class="block">
                                    <span class="title">Facere ipsa nulla corrupti praesentium </span>
                                </a> */}
                                <h3>#{pokeObj.id} - {(pokeObj.nome).charAt(0).toUpperCase() + pokeObj.nome.slice(1)}</h3>
                                <p class="description">
                                <h3>HABILIDADES:</h3>
                                    {
                                        pokeObj.abilities[0].map((e, index)=>{
                                            return <p key={index}>Habilidade {index + 1}: {(e.ability.name).charAt(0).toUpperCase() +  (e.ability.name).slice(1)}</p>
                                        })
                                    }
                                <h3>ESTILO:</h3>
                                    {
                                        pokeObj.style[0].map((est, index)=>{
                                            // return <p key={index}>Estilo {index + 1}: {(est.name).charAt(0).toUpperCase() + (est.name(1))} </p>
                                            return <p key={index}>Estilo {index + 1}: {(est.type.name).charAt(0).toUpperCase() + (est.type.name).slice(1)} </p>
                                        })
                                    }
                                <h3>NAVEGAR</h3>
                                    {
                                        // pokeObj.s
                                    }
                                <h3></h3>
                                <h3></h3>
                                </p>
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

{/* <p className="pokeP">{pokeObj.nome}</p>
<div class="card">
    <div class="card-image"><img src={pokeObj.image}/></div>
    <div class="category"> <p>{pokeObj.nome}</p> </div>
    <div class="heading">
        {
            pokeObj.abilities[0].map((e, index)=>{
                return <p>Habilidade {index + 1}: {(e.ability.name).charAt(0).toUpperCase() + (e.ability.name).slice(1)}</p>
            })
        } */}