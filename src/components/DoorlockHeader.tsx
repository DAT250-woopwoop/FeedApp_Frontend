
type DoorlockHeaderType = {
    setPage: (arg0:number)=> void, 
}



export const DoorlockHeader = (props:DoorlockHeaderType) => {


    return (
        <div className="App">
            <h1>Welcome to FeedApp</h1>
            <button onClick={() => props.setPage(5)}>Log In</button>
            <button onClick={() => props.setPage(3)}>Register</button>
        </div>
    )
}