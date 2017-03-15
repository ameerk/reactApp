import React from 'react';
import axios from 'axios';
import ContentSection from './ContentSection.jsx';

class App extends React.Component {
    componentWillMount() {
        console.log('componentWillMount is done.');
        axios.get('./data/content.json')
            .then(res => {
                var data = res.data;
                var contentList = data.content.map(function(item, index){
                        item.positionIndex = index;
                        return item;
                    });
                this.setState(
                    { data : data ,
                        contentList:contentList,
                        viewContent:contentList[0],
                    }
                );
            }, function(res){
                console.log("Error",res);
            });

    }

    constructor(props) {
        super(props);
        this.state = {
            data : {},
            content:{},
            contentList:[],
            index:0
        };
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
    }

    setViewData(prevLink, content, nextLink){
        this.setState({
            nextLink :nextLink,
            content:content,
            prevLink:prevLink
        });
    }

    onNext(){
        console.log(this.state.nextLink);
        var currentLinkIndex = this.state.nextLink.positionIndex;
        var nextLinkIndex = currentLinkIndex < this.state.contentList.length ? currentLinkIndex+1:currentLinkIndex ;
        var nextLink = this.state.contentList[nextLinkIndex];
        var content = this.state.contentList[currentLinkIndex];
        var prevLink = this.state.content;
        this.setViewData(prevLink, content, nextLink);


    }

    onPrev(){
        console.log("prev link",this.state.prevLink);
        var currentLinkIndex = this.state.prevLink.positionIndex;
        var nextLinkIndex = currentLinkIndex > 0 ? currentLinkIndex - 1:currentLinkIndex;
        console.log("prev", nextLinkIndex);
        var prevLink = this.state.contentList[nextLinkIndex];
        var content = this.state.contentList[currentLinkIndex];
        var nextLink = this.state.content;
        console.log("content",content);
        this.setViewData(prevLink, content, nextLink);
    }



    render () {
        return (
            <div className="container">
               <div className="header"><h2>{this.state.data.title}</h2></div>
                <p>{this.state.content.title} {this.state.content.positionIndex}</p>
                <ContentSection data={this.state.content}/>
                <div className="footer">
                    <button className="link prev" onClick={this.onPrev}>
                        <i className="prevIcon"></i>
                            <div>{this.state.prevLink.title}</div>
                    </button>
                    <button className="link next" onClick={this.onNext}>
                        <i className="nextIcon"></i>
                            <div>{this.state.nextLink.title}</div>
                    </button>
                </div>
            </div>
        );
    }
}
export default App;