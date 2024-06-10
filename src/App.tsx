import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import UsersTable from "./components/UsersTable";
import { SortField, type User } from "./types.d";

const baseApiUrl = "https://randomuser.me/api/";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [coloredRows, setColoredRows] = useState(false);
  const [sortedBy, setSoredtBy] = useState<SortField>(SortField.NONE);
  const [countrySearch, setCountrySearch] = useState<string | null>(null);
  const originalUsers = useRef<User[]>([]);

  const toggleColored = () => setColoredRows(!coloredRows);
  const toggleSortByCountry = () =>
    setSoredtBy(
      sortedBy === SortField.NONE ? SortField.COUNTRY : SortField.NONE
    );

  const handleSortColumn = (field: SortField) => {
    setSoredtBy(field);
  };

  const handleDeleteRow = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleResetUsers = () => {
    setUsers(originalUsers.current);
  };

  const handleCountrySearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCountrySearch(event.target.value);
  };

  useEffect(() => {
    fetch(`${baseApiUrl}?results=100`)
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  const filteredUsers = useMemo(() => {
    return countrySearch !== null && countrySearch.length > 0
      ? users.filter(
          (user: User) =>
            user.location.country
              .toLowerCase()
              .indexOf(countrySearch.toLowerCase()) !== -1
        )
      : users;
  }, [users, countrySearch]);

  const sortedUsers = useMemo(() => {
    if (sortedBy === SortField.COUNTRY) {
      return [...filteredUsers].sort((a: User, b: User) =>
        a.location.country.localeCompare(b.location.country)
      );
    }

    if (sortedBy === SortField.FIRST) {
      return [...filteredUsers].sort((a: User, b: User) =>
        a.name.first.localeCompare(b.name.first)
      );
    }

    if (sortedBy === SortField.LAST) {
      return [...filteredUsers].sort((a: User, b: User) =>
        a.name.last.localeCompare(b.name.last)
      );
    }

    return filteredUsers;
  }, [sortedBy, filteredUsers]);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <button onClick={toggleColored}>COLOREAR</button>
        <button onClick={toggleSortByCountry}>ORDERNAR POR PAIS</button>
        <button onClick={handleResetUsers}>RESETEAR USUARIOS</button>
        <input
          type="text"
          value={countrySearch || ""}
          onChange={handleCountrySearchChange}
        />
      </header>
      <main>
        <UsersTable
          users={sortedUsers}
          coloredRows={coloredRows}
          handleDeleteRow={handleDeleteRow}
          handleSortColumn={handleSortColumn}
        />
      </main>
    </div>
  );
}

export default App;
