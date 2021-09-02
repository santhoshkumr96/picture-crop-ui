import axios from "axios";
import React from "react";
import { Container, Row, InputGroup, FormControl, Button, Col, Dropdown } from "react-bootstrap";
import IfCustom from "../customTags/IfCustom";
import CropItemList from "./CropItemList";


const options = [
    { id: 1, name: 'text' },
    { id: 2, name: 'number' },
    { id: 3, name: 'date' },
    { id: 4, name: 'other' }
]


class CropResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelKeyBool: false,
            labelValueBool: false,
            label: '',
            labelNameBool: false,
            keyDropdown: 'text',
            valueDropdown: 'text',
            result: {}

        };

        this.setLableName = this.setLableName.bind(this);
        this.onSelectLabelKey = this.onSelectLabelKey.bind(this);
        this.onSelectLabelValue = this.onSelectLabelValue.bind(this);
        this.onDropDownSelectValue = this.onDropDownSelectValue.bind(this);
        this.onDropDownSelectKey = this.onDropDownSelectKey.bind(this);
        this.sendData = this.sendData.bind(this);
        this.sendWholeImage = this.sendWholeImage.bind(this);
    }



    sendData(){
        const body = this.state.result;
        const config = {
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        axios.post(this.state.url, body, config);
    }

    sendWholeImage(){
        const formData = new FormData()
        formData.append('image', this.props.mainImage)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };
        axios.post(this.state.urlForImage,formData, config);
    }

    onDropDownSelectKey(eventKey, event) {
        this.setState({
            keyDropdown: eventKey
        })
    }
    onDropDownSelectValue(eventKey, event) {
        this.setState({
            valueDropdown: eventKey
        })
    }

    setLableName() {
        const resultSet = this.state.result;
        resultSet[this.state.label] = {};
        this.setState(prevState => ({
            labelNameBool: true,
            labelKeyBool: true,
            result: resultSet
        }))
    }

    onSelectLabelKey() {
        const resultSet = this.state.result;
        resultSet[this.state.label]['labelKeyDimension'] = this.props.cropData;
        resultSet[this.state.label]['labelKey'] = this.props.cropImage;
        resultSet[this.state.label]['keyDataType'] = this.state.keyDropdown;
        resultSet[this.state.label]['label'] = this.state.label;
        resultSet[this.state.label]['profile'] = this.state.profileName;
        resultSet[this.state.label]['language'] = 'eng';
        resultSet[this.state.label]['pageNumber'] = parseInt(this.state.pageNumber);
        this.setState({
            labelKeyBool: false,
            labelValueBool: true,
            result: resultSet
        })
    }

    onSelectLabelValue() {
        const resultSet = this.state.result;
        resultSet[this.state.label]['labelValueDimension'] = this.props.cropData;
        resultSet[this.state.label]['valueDataType'] = this.state.valueDropdown;
        resultSet[this.state.label]['labelValue'] = this.props.cropImage;
        this.setState({
            labelKeyBool: false,
            labelValueBool: false,
            label: '',
            labelNameBool: false,
            result: resultSet
        })
        this.props.resetCrop();

    }

    render() {
        const { labelNameBool, labelKeyBool, labelValueBool, result } = this.state;
        return (
            <Container fluid >

                <Row style={{ border: '1px black dotted', padding: '10px' }}>
                    <Col>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Enter URL</InputGroup.Text>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e => this.setState({ url: e.target.value })} />
                            <Button variant="outline-secondary" id="button-addon1" onClick={this.sendData}>
                                sendData
                            </Button>
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Enter URL</InputGroup.Text>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e => this.setState({ urlForImage: e.target.value })} />
                            <Button variant="outline-secondary" id="button-addon1" onClick={this.sendWholeImage}>
                                send Image
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row style={{ border: '1px black dotted', padding: '10px', marginTop: '20px' }}>
                    <Col>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Enter Profile Name</InputGroup.Text>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e => this.setState({ profileName: e.target.value })} />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Enter Page Number</InputGroup.Text>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e => this.setState({ pageNumber: e.target.value })} />
                        </InputGroup>
                    </Col>
                </Row>

                <IfCustom condition={(this.state.profileName != null) & (this.state.pageNumber != null)}>
                    <Row style={{ border: '1px black dotted', padding: '10px', marginTop: '20px' }}>
                        <IfCustom condition={!labelNameBool}>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">Enter Label Name</InputGroup.Text>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e => this.setState({ label: e.target.value })} />
                                <Button variant="outline-secondary" id="button-addon1" onClick={this.setLableName}>
                                    ok
                                </Button>
                            </InputGroup>
                        </IfCustom>
                        <IfCustom condition={labelNameBool}>
                            <div>
                                <Row>
                                    <p>Label Name : {this.state.label}</p>
                                </Row>
                                <IfCustom condition={labelKeyBool}>
                                    <Row>
                                        <Row>
                                            <p> Please Select Label Key </p>
                                        </Row>
                                        <Row>
                                            {this.props.cropImage && (
                                                <img alt="Crop" style={{ maxWidth: '25%', maxHeight: '20vh' }} src={this.props.cropImage} />
                                            )}
                                        </Row>

                                        <Row>
                                            <Col>
                                                <Dropdown onSelect={this.onDropDownSelectKey}>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        {this.state.keyDropdown}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        {options.map(user => (
                                                            <Dropdown.Item eventKey={user.name} key={user.name}>
                                                                {user.name}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <Col>
                                                <Button variant="outline-secondary" id="button-addon1" onClick={this.onSelectLabelKey}>
                                                    ok
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                </IfCustom>
                                <IfCustom condition={labelValueBool}>
                                    <Row>
                                        <Row>
                                            <p> Please Select Label Value </p>
                                        </Row>
                                        <Row>
                                            {this.props.cropImage && (
                                                <img alt="Crop" style={{ maxWidth: '25%', maxHeight: '20vh' }} src={this.props.cropImage} />
                                            )}
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Dropdown onSelect={this.onDropDownSelectValue}>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        {this.state.valueDropdown}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        {options.map(user => (
                                                            <Dropdown.Item eventKey={user.name} key={user.name}>
                                                                {user.name}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <Col>
                                                <Button variant="outline-secondary" id="button-addon1" onClick={this.onSelectLabelValue}>
                                                    ok
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                </IfCustom>
                            </div>
                        </IfCustom>
                    </Row>
                    <Row>
                        <CropItemList data={JSON.stringify(result)} ></CropItemList>
                    </Row>
                </IfCustom>
            </Container>
        );
    }


}

export default CropResult;