import { SortField, type User } from "../../types.d";

interface UsersTableProps {
  users: User[];
  coloredRows: boolean;
  handleDeleteRow: (id: string) => void;
  handleSortColumn: (field: SortField) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  coloredRows,
  handleDeleteRow,
  handleSortColumn,
}) => {
  return (
    <>
      <table className="users-table" width="100%">
        <thead>
          <tr>
            <th>Foto</th>
            <th onClick={() => handleSortColumn(SortField.FIRST)}>Nombre</th>
            <th onClick={() => handleSortColumn(SortField.LAST)}>Apellido</th>
            <th onClick={() => handleSortColumn(SortField.COUNTRY)}>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? "#CCC" : "#EEE";
            const rowColor = coloredRows ? backgroundColor : "transparent";
            return (
              <tr key={user.email} style={{ backgroundColor: rowColor }}>
                <td>
                  <img src={user.picture.thumbnail} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => handleDeleteRow(user.email)}>
                    Borrar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
