import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function ScoopOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) =>
    updateItemCount(name, parseInt(e.target.value), "scoops");
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col style={{ textAlign: "left" }} xs="5">
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
