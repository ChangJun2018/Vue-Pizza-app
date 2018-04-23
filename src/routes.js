import Home from './components/Home'
import Menu from './components/Menu'
import About from './components/about/About'
import Admin from './components/Admin'
import Register from './components/Register'
import Login from './components/Login'

//二级路由
import Contact from './components/about/Contact'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'
import Delivery from './components/about/Delivery'
//三级路由
import PhoneNumber from './components/about/contact/PhoneNumber'
import PesonName from './components/about/contact/PesonName'

export const routes = [
  //点击主页展示home组件内容
  {path: '/', name: "homeLink", components: {
    default:Home,
      'orderingGuide':OrderingGuide,
      'delivery':Delivery,
      'history':History
    }},
  {path: '/menu', name: "menuLink", component: Menu},
  {
    path: '/admin', name: "adminLink", component: Admin},
  {
    path: '/about', name: "aboutLink", redirect: '/about/contact', component: About, children: [
      {
        path: '/about/contact', name: "contactLink", redirect: '/person', component: Contact, children: [
          {path: '/phone', name: "phoneLink", component: PhoneNumber},
          {path: '/person', name: "personLink", component: PesonName},
        ]
      },
      {path: '/history', name: "historyLink", component: History},
      {path: '/orderingGuide', name: "orderingGuideLink", component: OrderingGuide},
      {path: '/delivery', name: "deliveryLink", component: Delivery},
    ]
  },
  {path: '/register', name: "registerLink", component: Register},
  {path: '/login', name: "loginLink", component: Login},
  //如果输入路径不匹配，重定向到首页
  {path: '*', redirect: '/'},
]
