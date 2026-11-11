import { useState, useEffect, useCallback } from 'react';

const API_URL = `http://${window.location.hostname}:8089/people`;

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');

  const loadPeople = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadPeople();
    })();
  }, [loadPeople]);

  const handleClear = () => {
    setName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    setName('');
    await loadPeople();
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Empleados</h1>
      <div className="m-4 card col-4">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row">
            <div className="col-12">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ingrese el nombre del empleado" className="form-control" />
              <div className="mt-3 d-flex gap-2">
                <button type="button" onClick={handleClear} className="btn btn-secondary">
                  Limpiar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </div>
          </form>
          {employees.length > 0 ? (
            <>
              <h2 className="mt-4">Empleados</h2>
              <div>
                <div className="card-body">
                  <ul className="list-group">
                    {employees.map((employee, index) => (
                      <li key={employee.id ?? index} className="list-group-item">
                        {employee.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <h4 className="mt-4 text-muted">No hay empleados</h4>
          )}
        </div>
      </div>
    </div>
  );
}
