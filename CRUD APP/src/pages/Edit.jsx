
import { Form ,Button} from "react-bootstrap";
import usePostDetails from "../hook/use-post-details";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { editPost ,cleanRecord } from "../state/postSilce";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {postSchema} from "../util/ValidationSchema"


const Edit = () => {
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const { loading, error, record } = usePostDetails();




  



  useEffect(() => {
    return () => {
   dispatch(cleanRecord())
 }
},[dispatch])


  
   const formik = useFormik({
  
    initialValues: {
      title: record ? record?.title : "",
      description: record ? record?.description : "",
     },
     enableReinitialize:true,
    validationSchema: postSchema,
    onSubmit: (values) => {
        

      dispatch(
      editPost({ id:record.id,title:values.title,description:values.description  })
      ).unwrap().then(() => {
            navigat("/");  
          })
        
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
  
  )
}

export default Edit