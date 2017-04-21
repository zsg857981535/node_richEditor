/**
 * Created by DaGuo on 2017/4/19.
 */
//# 前端展示入口


import React,{ Component,PropTypes} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

import { Article,Blog } from './containers'
import { Icon } from 'antd'




const Navigation = ({className})=>(
    <header className= {`navigation-container ${className || ''}`}>
        <Link to = '' className = "logo">LOGO</Link>
        <nav>
            <ul className="clear">
                <li><Link to ='/'>BLOG</Link></li>
                <li><Link to = ''>ABOUT ME</Link></li>
                <li><Link to = ''>CONTACT ME</Link></li>
            </ul>
        </nav>
    </header>
);


class View extends Component{

    componentDidMount(){
        //auto hide navigation
        // let c, currentScrollTop = 0,
        //     nav = $(this.nav),
        //     b = nav.height();
        // console.log('nav,height',nav,b);
        // $(window).scroll(function () {
        //     let a = $(window).scrollTop();
        //     currentScrollTop = a;
        //     if (c < currentScrollTop && a > (b + b)) {
        //         nav.addClass("is-hide");
        //     } else if (c > currentScrollTop && !(a <= b)) {
        //         nav.removeClass("is-hide");
        //     }
        //     c = currentScrollTop;
        // });

        /*back to top button*/
        var offset = 300;
        var duration = 300;
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                $('.back-to-top').fadeIn(duration);
            } else {
                $('.back-to-top').fadeOut(duration);
            }
        });
        $('.back-to-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, duration);
        })
    }


    render(){
        const article = {
            art_img: require('./art_img.png'),
            art_title:'测试文章详情标题',
            art_createTime:'2017-04-15 下午14:00',
            art_content:'<p>测试文章内容</p>'
        };
        return(
           <Router>
               <div>
                   <Navigation ref = {nav=>this.nav=nav}/>
                   <Route path = "/" exact
                          render = {({...rest})=><Blog {...rest}/>}/>
                   <Route path = "/article" exact
                          render = {({...rest})=><Article article = {article} {...rest}/>} />
                   <a href="#" className="back-to-top">
                       <Icon type="up-square" />
                   </a>
               </div>
           </Router>
        )
    }
}
export default View