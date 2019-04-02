import React from 'react';
import {Card ,Row ,Col ,Modal} from 'antd';
import { Meta } from 'antd/lib/list/Item';

export default class Gallery extends React.Component{
    
    state={
        visible:false
    }

    openGallery = (imgSrc)=>{
        this.setState({
            currentImg: '/gallery/'+imgSrc,
            visible:true
        })
    }

    render(){
        // 有规律的可以用更简洁的方式定义，此处为无规律示范
        const imgs = [
            ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'],
            ['6.jpg','7.jpg','8.jpg','9.jpg','10.jpg'],
            ['11.jpg','12.jpg','13.jpg','14.jpg','15.jpg'],
            ['16.jpg','17.jpg','18.jpg','19.jpg','20.jpg'],
            ['21.jpg','22.jpg','23.jpg','24.jpg','25.jpg'],
        ]
        // 在map进行遍历时，箭头函数后面若不写大括号的话，只能写一个表达式，反之可写多个表达式。
        // 由于此处是二维数组的遍历，所以可写两个map函数作二次遍历来获取对应的元素值
        const imgList = imgs.map((list)=>list.map((item)=>
            <Card
                cover={<img src={'/gallery/'+item} onClick={()=>this.openGallery(item)}/>}
                style={{marginBottom:10}}
            >
                <Meta 
                    title="React"
                    description="react实战课程"
                />
            </Card>
        ))
        return(
            <div className="card-wrap">
                <Row gutter={10}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal
                    width={300}
                    height={500}
                    visible={this.state.visible}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    footer={null}
                    title="图片画廊"
                >
                    {<img src={this.state.currentImg} style={{width:'100%',padding:'50'}} />}
                </Modal>
            </div>
        );
    }
}
