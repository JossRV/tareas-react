// function App() {
//     return (
//         <>
//             <h1>Hola prraaaa xd</h1>
//         </>
//     )
// }
// const App = () => {
//     return (
//         <>
//             <h1>Hola mundo</h1>
//         </>
//     )
// }

// exportacion por defecto
// export default App;

// exportacion normal
// export const App = () => <><h1>Hola mundo puerko</h1></>

// rafc para crear tu componente rapidamente
import React, { useEffect, useReducer, useState } from 'react'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { FormularioTareas } from './components/FormularioTareas/FormularioTareas'
import { TarjetaTareas } from './components/TarjetaTareas.jsx/TarjetaTareas'
import { tareaReducer } from './reducers/tareaReducer'
import Swal from 'sweetalert2'
// import './style.css'


export const App = () => {
  const init = () => {
    return JSON.parse(localStorage.getItem("tareas")) || []
  }

  const [state, dispatch] = useReducer(tareaReducer, [], init)

  const [descripcion,setDescripcion] = useState("")

  useEffect(() =>{
    // guardo en el local storage la informacion de las tareas
    localStorage.setItem("tareas", JSON.stringify(state))
  }, [state])

  const handleInputChange = (e) => {
      // obtener el valor de los cambios que se van aplicando y guardarlos en el set
      setDescripcion(e.target.value)
      // console.log(descripcion)
  }
  const handleSubmit = (e) =>{
      // evitar que se recarge la pagina
      e.preventDefault();
    if(descripcion != ""){
      const tareaNueva = {
        // para agregar un nuevo id usamos el metodo date por tiempo
        // hay otra forma de agregar id por medio de la libreria uuid, que es lo que ortoga id a nivel mundial
        id: new Date().getTime(),
        descripcion: descripcion,
        realizado: false
      }

      const accion = {
        type: "add",
        payload: tareaNueva
      }

      dispatch(accion)

      setDescripcion("")
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Los campos estan vacios',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }
  // useEffect()
  // vamos a ejecutar algo que cambia

  const handleCambiar = (id) => {
    dispatch({
      type: "cambiar",
      payload: id
    })
    // console.log(state);
  }

  const handleEliminar = (id) => {
    Swal.fire({
      title: 'Seguro?',
      text: "ya borrado ya no se recuperara",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "borrar",
          payload: id
        })
        Swal.fire(
          'Eliminado',
          'el registro ha sido eliminado',
          'success'
        )
      }
    })
  }

  let terminadas = 0;
  for(let i = 0; i < state.length; i++){
    if(state[i].realizado === true){
      terminadas++;
    }
  }

  let porcentaje = terminadas / state.length;

  // console.log(terminadas);
  // console.log(porcentaje);

  // const tareas = [
  //   "Estudiando react", "ver tele", "Hacer tarea de Cross", "verificar las group cards", "hacer mas cards"
  // ];
  
  return (
    // <></> se llaman fragment
    <>
      <Header />
      <div className="container mt-5 text-light">
        <div className="row">
          <div className="col-12 col-lg-4 col-sm-12">
            <FormularioTareas handleInputChange={handleInputChange} handleSubmit={handleSubmit} descripcion={descripcion}/>
          </div>
          <div className="col-12 col-lg-8 col-sm-12 ">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xxl-3">
              {
                state.map((tarea, index) => {
                  return <TarjetaTareas key={index} id={index} index={tarea.id} tarea={tarea} handleCambiar={handleCambiar} handleEliminar={handleEliminar}/>
                })
                // tarea={tarea} index={index + 1}
                // console.log(state)
              }
            </div>
          </div>
        </div>
      </div>
      <Footer porcentaje={porcentaje}/>
    </>
  )
}

