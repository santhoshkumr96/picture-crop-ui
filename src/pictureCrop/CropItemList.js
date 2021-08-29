import React from "react";
import { Container, Row, InputGroup, FormControl, Button, Col } from "react-bootstrap";

class CropItemList extends React.Component {
    render() {
        return (
            <div style={{border:'1px black dotted' , padding: '10px', position:'relative' , top: '20px'}}>
                <pre>
                    <code>{JSON.stringify(JSON.parse(this.props.data), null, 4)}</code>
                </pre>
            </div>
        );
    }
}

export default CropItemList;