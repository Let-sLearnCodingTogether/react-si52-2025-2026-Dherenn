import { use, useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import ApiClient from "../../../../utils/ApiClient"
import { NavLink, useNavigate } from "react-router"

interface SignInForm{
    email : string,
    password: string
}

function SignIn(){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<SignInForm>({
            email: "",
            password: ""
        })

    const onHandleChange = (event : ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target
     
            setForm({
                ...form,
                [name] : value
            })
        }
    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        console.log("Tes")
        
        try {
            const response = await ApiClient.post("/signin", form)
            console.log(response);
            if (response.status === 200){
                localStorage.setItem("AuthToken", response.data.data.token)
                navigate("/movies", {
                    replace : true
                })
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false)
        }
    }

    return <div className="container mx-auto"> 
        <h1>SignIn</h1>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                value={form.email}
                    onChange={onHandleChange}
                    name="email"
                    type="text"
                    placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={form.password}
                    onChange={onHandleChange}
                    name="password"
                    type="password"
                    placeholder="Password" />
            </Form.Group>
            <Button type="submit" variant="primary" disabled = {isLoading}>{isLoading ? "Loading..." : "SignIn"}</Button>
            <NavLink to = "/" className = "btn btn-primary">SignUp</NavLink>
            </Form>
            
        
        
        
        </div>
}

export default SignIn