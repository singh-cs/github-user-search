import { useEffect, useState } from 'react'
import User from './components/User'

function App() {
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const apiURL='https://api.github.com/search/users?q=';

    useEffect(() => {
        fetch(`${apiURL}${query}`)
        .then(res => res.ok ? res.json() :  Promise.reject(res))
        .then(data => setUsers(data.items))
        .catch(res => console.log(res.status))
    }, [])
    const userList = users.map(user => {
        return (
            <User 
                key={user.id}
                userName={user.login}
                userAvatar={user.avatar_url}
                userHref={user.html_url}
            />)
    })

    function handleSubmit(event){
        event.preventDefault();
        fetch(`${apiURL}${query}`)
            .then(res => res.ok ? res.json() :  Promise.reject(res))
            .then(data => setUsers(data.items))
            .catch(res => res.status == 422 ? alert("please enter valid name") : alert("No user Found"))
    }

    function handleChange(event){
        setQuery(event.target.value)
    }


    return (
        <div className="App">
            <h1>Project 5:<br /> GitHub User Search</h1>
            <form className='search-form' onSubmit={handleSubmit}>
                <input placeholder='Enter username or email' className='form-input' onChange={handleChange} required/>
                <button className='form-btn'>Search</button>
            </form>
            <h2>
                Results
            </h2>
            
            {users && <div className='results'>
                {userList}
            </div>}
        </div>
    )
}
export default App