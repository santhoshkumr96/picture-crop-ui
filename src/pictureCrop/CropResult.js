import React from "react";
import { Container, Row, InputGroup, FormControl, Button, Col } from "react-bootstrap";
import IfCustom from "../customTags/IfCustom";
import CropItemList from "./CropItemList";

class CropResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelKeyBool: false,
            labelValueBool: false,
            label: '',
            labelNameBool: false,
            result : {}
            
        };

        this.setLableName = this.setLableName.bind(this);
        this.onSelectLabelKey = this.onSelectLabelKey.bind(this);
        this.onSelectLabelValue  = this.onSelectLabelValue.bind(this);
    }

    setLableName() {
        const resultSet = this.state.result;
        resultSet[this.state.label] = {};
        this.setState(prevState => ({
            labelNameBool: true,
            labelKeyBool : true,
            result : resultSet
        }))
    }

    onSelectLabelKey(){
        const resultSet = this.state.result;
        resultSet[this.state.label]['labelKeyDimension'] = this.props.cropData;
        resultSet[this.state.label]['labelKey'] = this.props.cropImage;
        this.setState({
            labelKeyBool : false,
            labelValueBool : true,
            result : resultSet
        })
    }

    onSelectLabelValue(){
        const resultSet = this.state.result;
        resultSet[this.state.label]['labelValueDimension'] = this.props.cropData;
        resultSet[this.state.label]['labelValue'] = this.props.cropImage;
        this.setState({
            labelKeyBool: false,
            labelValueBool: false,
            label: '',
            labelNameBool: false,
            result : resultSet
        })
        this.props.resetCrop();
    }

    render() {
        const { labelNameBool,labelKeyBool,labelValueBool,result} = this.state;
        return (
            <Container fluid>

                <Row>
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
                                        <Button variant="outline-secondary" id="button-addon1" onClick={this.onSelectLabelKey}>
                                            ok
                                        </Button>
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
                                        <Button variant="outline-secondary" id="button-addon1" onClick={this.onSelectLabelValue}>
                                            ok
                                        </Button>
                                    </Row>
                                </Row>
                            </IfCustom>
                        </div>
                    </IfCustom>
                </Row>
                <Row>
                    <CropItemList data={JSON.stringify(result)} ></CropItemList>
                </Row>
            </Container>
        );
    }


}

export default CropResult;