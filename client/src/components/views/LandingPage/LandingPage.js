import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Layout, Menu, Avatar } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import Sider from './Sections/Sider'
import { EditOutlined, EllipsisOutlined, MessageOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';

const { Meta } = Card;

function LandingPage() {
    const [Posts, setPosts] = useState([])
    const [Semester, setSemester] = useState("2021S")

    const variable = {
        semester: Semester
    }
    useEffect(() => {
        console.log("useEffect")
        Axios.post('/api/posts/getPosts', variable)
            .then(response => {
                console.log("getPosts");
                if (response.data.success) {
                    setPosts(response.data.posts)
                } else {
                    alert('Failed to fectch product datas')
                }
            })

    }, [Semester])

    const updateSemester = (selectSemester) => {
        setSemester(selectSemester)
        console.log("updateSemester");
    }

    const renderCards = Posts.map((post, index) => {

        return <Col key={index}>
            <Card 
                title={<div style={{maxHeight: '30px'}}> 
                    <a href={`/users/${post.writer._id}`} style={{color: 'black'}}>
                        <div style={{display: 'inline'}}><Avatar src={post.writer.image}/></div> 
                        <div style={{display: 'inline', marginLeft: '10px'}}>{post.writer.name}</div>
                    </a>
                </div>}
                style={{ marginBottom: 24 }}
                key={index}
                hoverable={true}
                actions={[
                    <HeartOutlined key="heart" />,
                    <a href={`/posts/${post._id}`} ><MessageOutlined key="edit" /></a>
                ]}
                cover={<ImageSlider images={post.images} />}
            >
                <Meta
                    title={post.title}
                    description={post.content}
                />
            </Card>
        </Col>

    })


    return (
        <div style={{ marginLeft: '270px', marginRight: '270px', marginTop: '20px' }}>
            <Row>
                <Col xs={0} sm={0} md={6} lg={8}>
                    <Sider refreshFunction={updateSemester}/>
                </Col>
                <Col xs={24} sm={24} md={18} lg={16} >
                    {Posts.length === 0 ?
                        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                            <h2>No post yet...</h2>
                        </div> :
                        <div >
                            {renderCards}
                        </div>
                    }
                </Col>

            </Row>
        </div>
    )
}

export default LandingPage