import React from "react";
import ReactToPrint from "react-to-print";

 
class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>你好！！！</div>
    );
  }
}
 
class Print extends React.Component {
  constructor(props){
    super(props);
    this.componentRef = '';
  }
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#/admin/profit/print">Print this out!</a>}
          content={() => this.componentRef }
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Print;