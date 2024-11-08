import { useOutletContext, Link, useLoaderData } from "react-router-dom";

export default function UserList() {
  var products = useOutletContext();
  // var { products } = useLoaderData();

  const handleDelete = (id) => {
    products = products.filter(function(x) { return x.id != id; }); 
  };

  return (
    <div className="container-fluid p-2 text-center">
      <div className="row p-2">
        <h2 className="p-2">Produtos</h2>
        <div className="col-md-8 offset-2 border border-1 rounded-4 shadow-s">
          <table className="table table-striped table-borderless table-hover table-sm">
            <thead>
              <tr>
                <th scope="col" className="p-3">Id</th>
                <th scope="col" className="p-3">Nome do Produto</th>
                <th scope="col" className="p-3">Quantidade</th>
                <th scope="col" className="p-3">Valor</th>
                <th scope="col" className="p-3">Editar</th>
                <th scope="col" className="p-3">Deletar</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {products.map((item) => (
                <tr key={item.id}>
                  <th scope="row" className="text-center">{item.id}</th>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">R$ {item.price}</td>
                  <td className="text-center">
                    <Link to="inserir" state={{ produto: item}} className={`btn btn-outline-secondary`}>Editar</Link>
                  </td>
                  <td className="text-center">
                    <button className={`btn btn-outline-danger`} onClick={() => handleDelete(item.id)}>Remover Produto</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-100 p-2">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <Link to="inserir">
              <button  className="btn btn-success btn-lg">Inserir Produto</button>
            </Link>
          </div>
          <div className="col4"></div>
        </div>
      </div>
    </div>
  );
};
