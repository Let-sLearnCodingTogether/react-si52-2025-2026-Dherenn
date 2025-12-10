import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router";
import ApiClient from "../../utils/ApiClient";

interface formMovie{
    judul: string,
    tahunRilis: string,
    sutradara: string
}

interface ResponseData{
    data : {
        _id: string,
        judul: string,
        tahunRilis: string,
        sutradara: string,
        createdBy: string,
        createdAt: string,
        updatedAt: string,
        __v: string
    },
    message : string
}

function EditMovie(){
    const params = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState<formMovie>({
        judul: "",
        tahunRilis: "",
        sutradara: ""
    })

    const fetchMovie = useCallback(async() => {
        const response = await ApiClient.get(`/movie/${params.id}`); //kalau pake s, ganti movie jadi movies
        if(response.status === 200){
            const responseData : ResponseData = response.data
            setForm({
                judul: responseData.data.judul,
                tahunRilis: responseData.data.tahunRilis,
                sutradara: responseData.data.sutradara  
            })
        }
    }, [params])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await ApiClient.put(`/movie/${params.id}`, form);
            navigate("/movies", {
                replace: true
            });
            console.log(response);
        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        fetchMovie
    }, [fetchMovie])

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
            <h4>Edit Movie Page</h4>
            <NavLink to="/" className = "btn btn-primary">List Movies</NavLink>
        </div>    
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className= "mb-3" controlId="formJudul">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control
                    value={form.judul} 
                    onChange={handleInputChange}
                    name="judul" 
                    type="text" 
                    placeholder="Judul Film"/>
                </Form.Group>
                <Form.Group className= "mb-3" controlId="formTahunRilis">
                    <Form.Label>Tahun Rilis</Form.Label>
                    <Form.Control
                    value={form.tahunRilis}
                    onChange={handleInputChange} 
                    name="tahunRilis" 
                    type="text" 
                    placeholder="Tahun Rilis"/>
                </Form.Group>
                <Form.Group className= "mb-3" controlId="formSutradara">
                    <Form.Label>Sutradara</Form.Label>
                    <Form.Control
                    value={form.sutradara}
                    onChange={handleInputChange}
                    name="sutradara" 
                    type="text" 
                    placeholder="Sutradara"/>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Update
                </Button>
            </Form>
        </div>
    </div>
}

export default EditMovie;