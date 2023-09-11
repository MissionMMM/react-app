// 1 导入 react
import React from 'react';
import ReactDOM from 'react-dom';

// 2 创建 react 元素
// const title=React.createElement('h1',null,'Hello React 脚手架')

// 3 渲染 React 元素
// ReactDOM.render(title,document.getElementById('root'))

// 使用 JSX 创建 react 元素
// const title=<h1>Hello JSX<span>这是span</span></h1>

// 渲染 react 元素
// ReactDOM.render(title,document.getElementById('root'))

/* ---------------------------------------------------------------------------
  JSX注意点
*/
/* const title = (
  <h1 className="title">Hello JSX</h1>
)

ReactDOM.render(title, document.getElementById('root')) */

/* ---------------------------------------------------------------------------
  JSX 中使用 JS 表达式
*/
/* const name="Rose"
const age=29

const title=(
  <h1>
    我是你爹，我叫：{name}，老子今年{age}岁
  </h1>
)

ReactDOM.render(title, document.getElementById('root')) */

/* ---------------------------------------------------------------------------
  JSX 注意点
*/

// 函数调用表达式
// const sayhi=()=>'Hi~'
// const dv=<div>我是一个div</div>

// const title=(
//   <h1>
//     我是你爹，我叫
//     <p>{1}</p>
//     <p>{'a'}</p>
//     <p>{5+3}</p>
//     <p>{1>0?'爹地':'妈咪'}</p>
//     <p>{sayhi()}</p>
//     {dv}
//     {/* 错误演示 */}
//     {/* <p>{{a:'6'}}</p> */}
//     {/* {if(true){}} */}
//     {/* {for(var i=0;i<10;i++){}} */}
//   </h1>
// )

// ReactDOM.render(title, document.getElementById('root'))

/* ---------------------------------------------------------------------------
  JSX 条件渲染
*/
// const isLoading=false
// const loadData=()=>{
//   // if/else
//   /* if(isLoading){
//     return <div>loading...</div>
//   }
//   return <div>数据加载完成，此处显示加载后的数据</div> */

//   // 三目运算符
//   return isLoading?(<div>loading...</div>):(<div>数据加载完成，此处显示加载后的数据</div>)

//   // 逻辑与运算符 短路逻辑
//   // return isLoading&&(<div>loading...</div>)
// }

// const title=(
//   <h1>
//     条件渲染：
//     {loadData()}
//   </h1>
// )

// ReactDOM.render(title, document.getElementById('root'))

/* ---------------------------------------------------------------------------
  JSX 列表渲染
*/
/* const songs=[
  {id:1,name:'天马流星拳'},
  {id:2,name:'庐山升龙霸'},
  {id:3,name:'元气弹'}
]

const list=(
  <ul>
    {songs.map(item=><li key={item.id}>{item.name}</li>)}
  </ul>
)

ReactDOM.render(list, document.getElementById('root')) */

/* ---------------------------------------------------------------------------
  JSX 样式处理
*/
// 样式引入
/* import './index.css'

const list=(
  // 行内样式 className 样式
  <h1 className="title" style={{color:'red',backgroundColor:'skyblue'}}>
    JSX样式处理
  </h1>
)
ReactDOM.render(list,document.getElementById('root')) */

/* ---------------------------------------------------------------------------
  受控组件：其值收到React控制的表单元素
  操作文本框的值
*/
// import './index.css'
// class App extends React.Component{
//   state={
//     txt:'',
//     content:'',
//     type:'Pizzy',
//     isChecked:false
//   }

//   handleForm=e=>{
//     // 获取当前DOM对象
//     const target=e.target

//     // 根据类型获取值
//     const value=target.type==='checkbox'?target.checked:target.value

//     // 获取name
//     const name=target.name

//     this.setState({
//       [name]:value
//     })
//   }

//   render(){
//     return(
//       <div>
//         {/* 文本框 */}
//         <input name="txt" className="ipt" type="text" value={this.state.txt} onChange={this.handleForm}/>

//         {/* 富文本框 */}
//         <textarea name="content" className='ipt' value={this.state.content} onChange={this.handleForm}></textarea>

//         {/* 下拉框 */}
//         <select name="type" className='ipt' style={{height:'80px'}} value={this.state.type} onChange={this.handleForm}>
//           <option value="FunCatch">FunCatch</option>
//           <option value="Pizzy">Pizzy</option>
//           <option value="Goal">Goal</option>
//         </select>

//         {/* 复选框 */}
//         <input name="isChecked" className='ipt' type="checkbox" style={{width:'50px',height:'50px'}} checked={this.state.isChecked} onChange={this.handleForm}/>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App/>,document.getElementById("root"))

/* ---------------------------------------------------------------------------
  非受控组件   了解即可
*/
import './index.css'
class App extends React.Component{
  constructor(){
    super()

    // 创建ref
    this.txtRef=React.createRef()
  }

  getTxt=()=>{
    console.log('文本框的值：',this.txtRef.current.value)
  }

  render(){
    return(
      <div>
        <input className='ipt' type="text" ref={this.txtRef}/>

        <button onClick={this.getTxt}>获取文本框的值</button>
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById("root"))