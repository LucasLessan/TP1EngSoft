import { Outlet } from "react-router-dom";

export default function Usuarios() {
  // Exemplos de usuários
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

  return (
    <Outlet context={usuariosList}/>
    // <Outlet/>
  );
};
