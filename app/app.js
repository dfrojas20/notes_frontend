const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

var url = `http://LB_IP/notes`

fetch(url, {
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },})
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    return response.json();
  })
  .then(data => {
    // Aquí tienes acceso a los datos JSON
    data 
    console.log(data[0].title)
    data.forEach(element => {
        let html = `
    <li class="list-group-item">
        <span>Título: ${element.title}</span><br>
        <span>${element.content}</span><br>
        <span>Última actualización: ${element.last_updated_date}</span><br>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
     list.innerHTML += html;
    });
  })
  .catch(error => {
     alert('Error al cargar el archivo JSON:', error);
  });

// add new todos
/*/const generateTemplate = (todo,content) => {
  const html = `
        <li class="list-group-item">
        <span>${todo}</span><br>
        <span>Contenido: ${content}</span><br>
        <i class="far fa-trash-alt delete"></i>
        </li>
        `;
  list.innerHTML += html;
};
/*/

// clear todo text box input and prevent inputs with unecessary white space
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = addForm.add.value.trim();
  const content = addForm.content.value.trim()

  postJson(title,content)

  if (title.length) {
    //generateTemplate(title,content);
    //addForm.reset();
  }

  location.reload()
});

// delete todos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});


function postJson(title,content){
    const data = {
        title: title,
        content: content,
    };
    // Configuración de la solicitud POST
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convierte el objeto JSON a una cadena JSON
    };
    // Realizar la solicitud POST utilizando fetch
    fetch(url, requestOptions)
        .then(response => {
            // Verificar si la respuesta es exitosa (código 200)
            if (!response.ok) {
                throw new Error('No se pudo completar la solicitud');
            }
            // Devolver la respuesta como JSON
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta del servidor
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            // Manejar errores
            throw new Error('Error en la solicitud POST:', error);
        });

}