export async function getUsuarios(query) {
  // await fakeNetwork(`getContacts:${query}`);
  // let contacts = await localforage.getItem("contacts");
  // if (!contacts) contacts = [];
  // if (query) {
  //   contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  // }
  // return contacts.sort(sortBy("last", "createdAt"));

  // Exemplo de usuarios
  const usuariosList = [
    { id: 1, nome: 'Epaminondas', tipo: 'Gerente', email: 'epa@pointify.com' },
    { id: 2, nome: 'Hermenegilda', tipo: 'Vendedor', email: 'gilda@pointify.com' },
    { id: 3, nome: 'Astolfo', tipo: 'Vendedor', email: 'toto@pointify.com' },
    { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
    // { id: 4, nome: 'Godofreda', tipo: 'Diretor', email: 'god@pointify.com' },
  ];

  return usuariosList;
}

// export async function getContact(id) {
//   await fakeNetwork(`contact:${id}`);
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find(contact => contact.id === id);
//   return contact ?? null;
// }
