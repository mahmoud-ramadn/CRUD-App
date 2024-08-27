import { useNavigate, useRouteError } from "react-router-dom";
import {
    Container,
    Row,
    Button,
    Col,
  } from "react-bootstrap";
const ErrorPage = () => {
    const naviget = useNavigate();
    const error = useRouteError();
    console.error(error);



  return (
    <Container>
    <Row>
      <Col xs={{ span: 8, offset: 2 }}>
      <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
                      <p>
                   <i>{error.statusText || error.message}</i>                    
      </p>
    <Button variant="link" onClick={()=>naviget("/",{replace:true})}>Link</Button>
    </div>
          </Col>
    </Row>
  </Container>
  )
}

export default ErrorPage