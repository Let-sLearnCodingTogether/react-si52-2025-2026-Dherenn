import { NavLink } from "react-router";

function AddMovie(){
    return <div>
        <h2>Add Movie Page</h2>
        <NavLink to = "/" className = "btn btn-primary">List Movies</NavLink>
        
    </div>
}

export default AddMovie;