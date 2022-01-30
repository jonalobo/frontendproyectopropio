const btn = document.getElementById('btnConsulta')
const URL = 'https://servidorgarantias.herokuapp.com/api/equipo?serie='
const scripting = document.querySelector('.respuesta')
const serie = document.querySelector('input')
const formulario = document.getElementById('form')


btn.addEventListener('click', (e)=>{
    e.preventDefault()
    if (validarSerie(serie.value)) {
        console.log('arranca');
        spiner()
        fetch(`${URL}${serie.value}`)
            .then(res=>res.json())
            .then((data)=>{
               const respuesta = data.existeSerie
               manejoMensaje(respuesta, serie)
               manejoRespuesta(respuesta)
            })
    }
})

function modal(marca, venceGarantia, consola) {
        const modalHtml = `<!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Ver estado
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Información de garantía</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <table>
              <tr>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Garantía</th>
              </tr>
              <tr>
                  <td>${marca}</td>
                  <td>${consola}</td>
                  <td>${venceGarantia}</td>
              </tr>
          </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
        
        `
      scripting.innerHTML = modalHtml
}

const validarSerie = (serie) => {
    if (serie != '') {
        return serie
    } else {
        alert('Debe ingresar el número de serie del equipo')
    }
}

function manejoMensaje(respuesta,serie) {
    if (respuesta.length === 0) {
        
        const html = `
        <div class="error"> la serie  ${serie.value} no existe en nuestro sistema</div>
        `
        const divError = document.createElement('div')
        divError.innerHTML = html
        scripting.appendChild(divError)
        setTimeout(() => {
            scripting.remove()
            location.reload();
        }, 3000);
    }
}

function manejoRespuesta(respuesta){
    if (respuesta.length != 0) {
        respuesta.forEach(elemento => {
            const { marca, venceGarantia, consola }= elemento
            modal(marca, venceGarantia, consola)
        });
    }
}


function spiner() {
    const spiner = document.createElement('div')
    spiner.classList.add('sk-chase')
    spiner.innerHTML = `
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    `
    scripting.appendChild(spiner)
}