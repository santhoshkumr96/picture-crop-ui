import React from "react";
import { Container, Row, InputGroup, FormControl, Button, Col } from "react-bootstrap";

class CropItemList extends React.Component {

    constructor(props) {
        super(props);

        this.renderCropList = this.renderCropList.bind(this);
    }
//  1. profile name - to understand company name -- done
//  2. page number - manual (can try to auto pop) -- done
//  3. language - upto three for initial load (hard code)
//  4. data type - (text, number should be selected by the user) -- text, number, date and others  - done
//  5. URL submit for testing in remote (pciture as stream and blob)    

    renderCropList(dataSet) {
        const result = [];

        const data = JSON.parse(dataSet);

        for (const [key, value] of Object.entries(data)) {
            result.push(
                <Row style={{ border: '1px black dotted', padding: '10px', top: '20px' , margin: '10px' }}>
                    <div>
                        <p>Label Name : {key}</p>
                    </div>
                    <Row>
                        <Col>
                            <pre>
                                <code>{JSON.stringify(value.labelKeyDimension, null, 4)}</code>
                            </pre>
                        </Col>
                        <Col>
                            {value.labelKey && (
                                <img alt="Crop" style={{ maxWidth: '100%', maxHeight: '20vh' }} src={value.labelKey} />
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <pre>
                                <code>{JSON.stringify(value.labelValueDimension, null, 4)}</code>
                            </pre>
                        </Col>
                        <Col>
                            {value.labelValue && (
                                <img alt="Crop" style={{ maxWidth: '100%', maxHeight: '20vh' }} src={value.labelValue} />
                            )}
                        </Col>
                    </Row>
                </Row>
            )
        }

        return (
            result
        );
    }

    render() {

        const cropListItems = this.renderCropList(this.props.data);

        return (
            <div style={{ height:'80vh' , overflowY : 'overlay' , border: '1px black dotted', padding: '10px', position: 'relative', top: '20px' }}>
                {cropListItems}
            </div>
        );
    }
}

export default CropItemList;