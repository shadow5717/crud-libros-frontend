document.addEventListener("DOMContentLoaded", () => {
  mostrarLibros();

  const form = document.getElementById("libroForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("libroId").value;
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;

    if (id) {
      actualizarLibro(id, titulo, autor);
    } else {
      agregarLibro(titulo, autor);
    }

    form.reset();
    document.getElementById("libroId").value = "";
    mostrarLibros();
  });
});

function obtenerLibros() {
  return JSON.parse(localStorage.getItem("libros")) || [];
}

function guardarLibros(libros) {
  localStorage.setItem("libros", JSON.stringify(libros));
}

function agregarLibro(titulo, autor) {
  const libros = obtenerLibros();
  const nuevoLibro = {
    id: Date.now(),
    titulo,
    autor,
  };
  libros.push(nuevoLibro);
  guardarLibros(libros);
}

function mostrarLibros() {
  const libros = obtenerLibros();
  const tabla = document.getElementById("librosTabla");
  tabla.innerHTML = "";

  libros.forEach((libro) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>
          <button class="edit" onclick="editarLibro(${libro.id})">Editar</button>
          <button class="delete" onclick="eliminarLibro(${libro.id})">Eliminar</button>
        </td>
      `;
    tabla.appendChild(fila);
  });
}

function editarLibro(id) {
  const libros = obtenerLibros();
  const libro = libros.find((l) => l.id === id);
  document.getElementById("libroId").value = libro.id;
  document.getElementById("titulo").value = libro.titulo;
  document.getElementById("autor").value = libro.autor;
}

function actualizarLibro(id, titulo, autor) {
  const libros = obtenerLibros();
  const index = libros.findIndex((l) => l.id == id);
  libros[index] = { id: parseInt(id), titulo, autor };
  guardarLibros(libros);
}

function eliminarLibro(id) {
  const libros = obtenerLibros().filter((l) => l.id !== id);
  guardarLibros(libros);
  mostrarLibros();
}
