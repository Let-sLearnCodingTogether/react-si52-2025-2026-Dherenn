import { NavLink } from "react-router";

function Movies(){
    return <div>
        <h2>Movie Page</h2>
        <NavLink to="/add-movie" className = "btn btn-primary">Add Movie</NavLink>
    </div>
}

export default Movies;