import { useState, type FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import ApiClient from "../../../../utils/ApiClient";

interface SignUpForm{
    username: string,
    email: string,
    password: string
}

function SignUp() {
    const [form, setForm] = useState<SignUpForm>({
        username: "",
        email: "",
        password: ""    
    })
const onHandleChange =(event : React.ChangeEvent<HTMLInputElement>) => {
const {name, value} = event.target;
setForm({
    ...form,
    [name] : value
})
}

const onSubmit = async(event : FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
        const response = await ApiClient.post("/signup", form)
        console.log(response)
    } catch (error) {
        console.log(error)

    }
}

    return <div className="container mx-auto">
        <h1>Sign Up</h1>
        <Form onSubmit={onSubmit}>
            <Form.Group className= "mb-3" controlId="formusername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                    value={form.username}
                    onChange={onHandleChange} 
                    name="username" 
                    type="text" 
                    placeholder="Username"/>
                </Form.Group>
                    <Form.Group className= "mb-3" controlId="formemail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    value={form.email}
                    onChange={onHandleChange} 
                    name="email" 
                    type="text" 
                    placeholder="Email"/>
                </Form.Group>
                    <Form.Group className= "mb-3" controlId="formpassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    value={form.password}
                    onChange={onHandleChange} 
                    name="password" 
                    type="text" 
                    placeholder="Password"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            </div>
    
}




export default SignUp