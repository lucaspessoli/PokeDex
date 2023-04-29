import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navegation from "../nave/Navegation";
import PokemonCollection from "./PokemonCollection";

function Misc(){

    const [buscaPoke, setBuscaPoke] = useState();
    const [exibir, setExibir] = useState(false);
    const [pokeObj, setPokeObj] = useState({id: 0, nome: '', image: "", abilities: [], style: [], desc: ""})
    const [navegarId, setNavegarId] = useState();


    function BuscarPokemon(){
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
            setNavegarId(idP);
            toast.success("Pokemon encontrado no sistema!")
        })
        .catch(e => toast.error("Pokemon não encontrado , você escreveu corretamente?"))
    }

    function BuscarProximoPokemon(){
        var idDeBusca = parseInt(navegarId) + 1;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${idDeBusca}`)
            .then((response)=>{
                const data = response.data
                var pokeImage =  data.sprites.front_default;
                var pokeName = data.forms[0].name;
                var abil = [data.abilities]
                var estilo = [data.types]
                var idP = [data.id]
                var desc = [data]
                setPokeObj({id: idP, nome: pokeName, image: pokeImage, abilities: abil, style: estilo});
                setNavegarId(idDeBusca);
            })
    }

    function BuscarPokemonAnterior(){
        var idDeBusca = parseInt(navegarId) - 1;
            axios.get(`https://pokeapi.co/api/v2/pokemon/${idDeBusca}`)
            .then((response)=>{
                const data = response.data
                var pokeImage =  data.sprites.front_default;
                var pokeName = data.forms[0].name;
                var abil = [data.abilities]
                var estilo = [data.types]
                var idP = [data.id]
                var desc = [data]
                setPokeObj({id: idP, nome: pokeName, image: pokeImage, abilities: abil, style: estilo});
                setNavegarId(idDeBusca);
            })
    }

    return(
        <div>
            <Navegation />
            <input id="oi" type="text" placeholder="Buscar pelo nome ou id" onChange={(e => setBuscaPoke(e.target.value))}/><br/>
            <button onClick={BuscarPokemon}>Buscar</button>
            {
                (exibir ? (
                    <div>
                        <div className="card">
                                <div className="header">
                                    <div className="image">
                                        <span className="tag"><img src={pokeObj.image} /></span>
                                    </div>
                                </div>
                                <div className="info">
                                    {/* <a rel="noopener noreferrer" href="#" class="block">
                                        <span class="title">Facere ipsa nulla corrupti praesentium </span>
                                    </a> */}
                                    <h3>#{pokeObj.id} - {(pokeObj.nome).charAt(0).toUpperCase() + pokeObj.nome.slice(1)}</h3>
                                    <h3>HABILIDADES:</h3>
                                        {
                                            pokeObj.abilities[0].map((e, index)=>{
                                                return <p key={index}>Habilidade {index + 1}: {(e.ability.name).charAt(0).toUpperCase() +  (e.ability.name).slice(1)}</p>
                                            })
                                        }
                                    <h3>ESTILO:</h3>
                                        {
                                            pokeObj.style[0].map((est, index)=>{
                                                return <p key={index}>Estilo {index + 1}: {(est.type.name).charAt(0).toUpperCase() + (est.type.name).slice(1)} </p>
                                            })
                                        }
                                </div>
                            </div>
                            <div>
                                <br/>
                                <button onClick={BuscarPokemonAnterior}>ANTERIOR</button>
                                <button onClick={BuscarProximoPokemon}>PRÓXIMO</button>
                                <br/>
                            </div>
                            <div>
                                <PokemonCollection />
                            </div>
                        </div>
                ) : (
                    <div>
                        <PokemonCollection />
                    </div>
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