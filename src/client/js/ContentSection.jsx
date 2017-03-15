import React from 'react';

class ContentSection extends React.Component{
    render(){
        return(<div>
            <div className="imageBox"></div>
            <div className="descriptionBox">{this.props.data.description}</div>
        </div>
        );
    }
}

export default ContentSection;