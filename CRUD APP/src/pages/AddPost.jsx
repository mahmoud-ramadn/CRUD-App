
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {insetPost} from "../state/postSilce"  // Fix typo in import
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
import { useFormik } from "formik";
import {postSchema} from "../util/ValidationSchema"


const AddPost = () => {
  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.Posts);

  const formik = useFormik({
  
    initialValues: {
      title: "",
      description:""
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
          const id = Math.floor(Math.random()* 500);

      dispatch(
        insetPost({ id, title: values.title, description: values.description })
      ).unwrap().then(() => {
            navigate("/");  
          }).catch((error) => console.log(error));
          
        
    }
  });
  
  
  
  
  
  
  
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
{formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          isInvalid={!!formik.errors.description}
          
        />

<Form.Control.Feedback type="invalid">
{formik.errors.description}
        </Form.Control.Feedback>
      </Form.Group>

      <Loading  loading={loading} error={error}>

      <Button variant="primary" type="submit">
          submit
        </Button>

      </Loading>
       
    </Form>
  );
};

export default AddPost;
