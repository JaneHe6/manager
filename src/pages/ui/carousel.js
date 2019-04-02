import React from 'react';
import {Card, Carousel} from 'antd';
import './ui.less';

export default class Carousels extends React.Component{

    onChange = ()=>{

    }

    render(){
        return(
            <div>
                <Card className="card-wrap" title="文字背景轮播">
                    <Carousel autoplay effect="fade">
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                </Card>
                <Card className="card-wrap slider-wrap" title="图片轮播">
                    <Carousel autoplay className="slider-wrap">
                        <div><img src="./gallery/11.jpg" /></div>
                        <div><img src="./gallery/1.jpg" /></div>
                        <div><img src="./gallery/17.jpg" /></div>
                        <div><img src="./gallery/19.jpg" /></div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}