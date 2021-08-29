import './App.css';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PictureCrop from './pictureCrop/PictureCrop';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <PictureCrop></PictureCrop>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
