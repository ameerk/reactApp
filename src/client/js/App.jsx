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
                        content:contentList[0],
                        nextLink:contentList[1]
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
            nextLink:{},
            prevLink:{}
        };
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
    }

    onNext(){
        console.log(this.state.nextLink);
        var currentIndex = this.state.nextLink.positionIndex;
        var nextIndex = (currentIndex < this.state.contentList.length -1)? currentIndex+1:currentIndex;
        var nextLink = this.state.contentList[nextIndex];
        var nextContent = this.state.contentList[currentIndex];
        var currentContent = this.state.content;
        this.setState({
            nextLink :nextLink,
            content:nextContent,
            prevLink:currentContent
        });
    }

    onPrev(){
        console.log(this.state.prevLink);
        var targetIndex = this.state.prevLink.positionIndex;
        var prevIndex = (targetIndex < 0)? targetIndex-1:targetIndex;
        var prevLink = this.state.contentList[prevIndex];
        var content = this.state.contentList[targetIndex];
        var currentContent = this.state.content;
        this.setState({

            nextLink :currentContent,
            content:content,
            prevLink:prevLink
        });
    }


    render () {
        return (
            <div className="container">
               <div className="header"><h2>{this.state.data.title}</h2></div>
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