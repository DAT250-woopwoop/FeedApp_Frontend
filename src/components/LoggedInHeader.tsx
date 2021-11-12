type HeaderProps = {
  setPage: (arg0: number) => void,
};

export const LoggedInHeader = (props: HeaderProps) => {
  return (
    <div className="App">
      <h1>Welcome to FeedApp</h1>
      <button onClick={() => props.setPage(1)}>Users</button>
      <button onClick={() => props.setPage(2)}>Polls</button>
      <button onClick={() => props.setPage(4)}>Add new poll</button>
      <button onClick={() => props.setPage(5)}>Min Side</button>
      <button onClick={() => props.setPage(6)}>Search</button>

      </div>
  );
};
