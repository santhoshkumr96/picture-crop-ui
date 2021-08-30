import React from "react";


class IfCustom extends React.Component{
    render(){
        if(this.props.condition == true){
            return(
                <div>
                    {this.props.children}
                </div>
            )
        }
        if(this.props.condition == false || this.props.condition == null){
            return(
                <div style={{display:'none'}}>
 
                </div>
            )
        }
    }
}

export default IfCustom