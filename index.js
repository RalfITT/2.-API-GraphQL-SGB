const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');

/// Simulated data stores
const libros = [
    { id: "1", titulo: "1984", autorId: "2", isbn: "0452284236", anioPublicacion: 1949 },
    { id: "2", titulo: "To Kill a Mockingbird", autorId: "3", isbn: "0446310786", anioPublicacion: 1960 },
    { id: "3", titulo: "The Great Gatsby", autorId: "5", isbn: "0743273567", anioPublicacion: 1925 },
    { id: "4", titulo: "Moby Dick", autorId: "6", isbn: "1503280780", anioPublicacion: 1851 },
    { id: "5", titulo: "Pride and Prejudice", autorId: "7", isbn: "1986431485", anioPublicacion: 1813 }
];

const autores = [
    { id: "1", nombre: "Douglas Adams", nacionalidad: "British" },
    { id: "2", nombre: "George Orwell", nacionalidad: "British" },
    { id: "3", nombre: "Harper Lee", nacionalidad: "American" },
    { id: "4", nombre: "J.D. Salinger", nacionalidad: "American" },
    { id: "5", nombre: "F. Scott Fitzgerald", nacionalidad: "American" },
    { id: "6", nombre: "Herman Melville", nacionalidad: "American" },
    { id: "7", nombre: "Jane Austen", nacionalidad: "British" },
    { id: "8", nombre: "J.R.R. Tolkien", nacionalidad: "British" },
    { id: "9", nombre: "J.K. Rowling", nacionalidad: "British" },
    { id: "10", nombre: "Fyodor Dostoevsky", nacionalidad: "Russian" }
];

const prestamos = [
    { id: "1", libroId: "1", usuario: "Alice Smith", fechaPrestamo: "2024-03-01", fechaDevolucion: null },
    { id: "2", libroId: "3", usuario: "Bob Johnson", fechaPrestamo: "2024-02-24", fechaDevolucion: "2024-03-10" },
    { id: "3", libroId: "5", usuario: "Carol White", fechaPrestamo: "2024-03-05", fechaDevolucion: null },
    { id: "4", libroId: "2", usuario: "Dave Black", fechaPrestamo: "2024-03-07", fechaDevolucion: null }
];


// Read GraphQL schema from file
const typeDefs = gql(fs.readFileSync('./libros.graphql', { encoding: 'utf-8' }));

// Define resolvers for your schema
const resolvers = {
    Query: {
        todosLosLibros: () => libros,
        libroPorId: (parent, { id }) => libros.find(libro => libro.id === id),
        todosLosAutores: () => autores,
        prestamosActivos: () => prestamos.filter(prestamo => !prestamo.fechaDevolucion)
    },
    Libro: {
        autor: (libro) => autores.find(autor => autor.id === libro.autorId)
    },
    Prestamo: {
        libro: (prestamo) => libros.find(libro => libro.id === prestamo.libroId)
    }
};

// Create an instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Start the server
server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
});
/*
query {
    todosLosLibros {
        titulo
        autor {
            nombre
        }
    }
}

query {
    libroPorId(id: "ID_DEL_LIBRO") {
        titulo
        autor {
            nombre
        }
        isbn
        anioPublicacion
    }
}

query {
    todosLosAutores {
        nombre
        nacionalidad
    }
}

query {
    prestamosActivos {
        libro {
            titulo
            autor {
                nombre
            }
        }
        usuario
        fechaPrestamo
        fechaDevolucion
    }
}
*/