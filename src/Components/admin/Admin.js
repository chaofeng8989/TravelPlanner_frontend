import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom'
import '../../styles/Admin.css'
//import logo from '../../assets/Echarts/Satellite.svg';

const { Header, Content, Footer } = Layout;

class Admin extends Component {
    // function in order to transform page
    go=({ item, key, keyPath, domEvent }) => {  //路由跳转路径，通过onClick设置页面path
        this.props.history.push(key);
    }
    

    render() {
        return <Layout>
            <Header className="header" style={{ position:"fixed", zIndex: 1, width: '100%', height: "5%"}}>
                <div className=""logo/>
                <Menu theme='dark' mode="horizontal" style={{float: "left"}} defaultSelectedKeys={['2']}>
                    <Menu.Item key="/home/MainPage" onClick={this.go} >MainPage</Menu.Item>
                    <Menu.Item key="/home/Recommondation" onClick={this.go}  >Recommended Trip</Menu.Item>
                    <Menu.Item key="/home/CityDetails" onClick={this.go} >Trip Details</Menu.Item>
                    <Menu.Item key="/home/Itinary" onClick={this.go} >Itinary</Menu.Item>
                    <Menu.Item key="/home/Login" onClick={this.go} >Login</Menu.Item>
                </Menu>
            </Header>
            <Content
                style={{
                    background: '#fff',
                    padding: 24,
                    marginTop: 50,
                    marginBottom: 0,
                    minHeight: 600,
                }}
            >
                <div className="layout-content" style={{
                    paddingBottom: 0,
                }}>
                    {this.props.children} {/*渲染的二级路由页面,接收从<Admin>传回的子页面*/}
                </div>
            </Content>
            <Footer className="footer" style={{ textAlign: 'center'}}>
                    @2020 Created by Travel Planner Team
            </Footer>
        </Layout>
    }
}

export default withRouter(Admin);
