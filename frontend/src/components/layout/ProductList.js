import { useOutletContext, Link, useLoaderData } from "react-router-dom";

export default function UserList() {
  var products = useOutletContext();
  // var { products } = useLoaderData();

  const handleDelete = (id) => {
    products = products.filter(function(x) { return x.id != id; }); 
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col1" />
        <div className="col10 border border-3 rounded-4 shadow-sm">
          <table className="table table-striped table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nome do Produto</th>
                <th scope="col">Valor</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {products.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link to="inserir" state={{ produto: item}}>
                      <button>Editar</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>Remover Produto</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col1" />
      </div>
      <div className="container w-50">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <Link to="inserir" className="btn btn-primary btn-sm">Inserir Produto</Link>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};
