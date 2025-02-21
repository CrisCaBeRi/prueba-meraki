Prueba Técnica - LitElement con JSON Server

Este proyecto es una prueba técnica que implementa LitElement para crear una aplicación web que consume una API de JSON Server. La aplicación lista Pokémon y muestra los detalles de sus transformaciones al hacer clic en cada uno.

Tecnologías Utilizadas

LitElement - Para la creación de componentes web.

JSON Server - Para simular una API REST.

Fetch API - Para consumir los datos desde JSON Server.

Node.js - Para ejecutar JSON Server.

Instalación y Ejecución

1. Clonar el Repositorio

git clone https://github.com/tu-usuario/nombre-del-repo.git
cd nombre-del-repo

2. Instalar Dependencias

npm install

3. Iniciar JSON Server

npx json-server src/db/pokemon.json --port 3000

Esto iniciará un servidor en http://localhost:3000 con los datos de src/db/pokemon.json.

4. Iniciar la Aplicación

npm run dev

Esto iniciará la aplicación en modo desarrollo.

Estructura del Proyecto

├── src/
│   ├── assets/
│   ├── components/
│   ├── db/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── index.css
│   ├── pokemon-app.js
├── public/
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
├── README.md

Funcionamiento

Listado de Pokémon: Se obtiene desde http://localhost:3000/pokemon.

Detalle y Transformaciones: Al hacer clic en un Pokémon, se muestra su evolución o transformaciones.

API Simulada (src/db/pokemon.json)

{
  "pokemon": [
    {
      "id": 1,
      "nombre": "Bulbasaur",
      "evoluciones": ["Ivysaur", "Venusaur"]
    },
    {
      "id": 2,
      "nombre": "Charmander",
      "evoluciones": ["Charmeleon", "Charizard"]
    }
  ]
}

Mejoras Futuras

Agregar estilos con Tailwind o CSS.

Implementar un sistema de rutas.

Conectar con una API real de Pokémon.

Autor

Cristian Camilo Betancourt Rincon - CrisCaBeRi