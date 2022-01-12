import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import './App.css';

const user = {
  firstName: 'Zé',
  LastName: 'Letício'
}

function formatName(user) {
  return user.firstName + ' ' + user.LastName;
}

function Logo(props) {
  return (
    <img src={props.logo} className="App-logo" alt="logo"/>
  );
}

//Todos os componentes React tem que agir como funções puras em relação aos seus props.

function Avatar(props) {
  return (
    <div>
      <h1>Hello, {formatName(props.user)}!</h1>
      <h2>Its is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(()=>this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return(
      <div className="app">
        <header className="App-header">
          <Logo logo={logo}/>
          <Avatar user={user} date={this.state.date}/>
        </header>
      </div>
    )
  }
}

function App() {
  return (
    <div>
      <Clock/>
      <Form/>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);


//another component

function Form(props) {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Você clicou em enviar');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Enviar</button>
    </form>
  );
}



// function component
// function Welcome(props) {
//   return <div className="app">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo"/>
//         <h1>Hello, {formatName(props.name)}!</h1>
//         <h2>Its is {new Date().toLocaleTimeString()}.</h2>
//       </header>
//     </div>
// }

// ES6 Class
// class Welcome extends React.Component {
//   render() {
//     return(
//       <div className="app">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo"/>
//           <h1>Hello, {formatName(this.props.name)}!</h1>
//           <h2>Its is {new Date().toLocaleTimeString()}.</h2>
//         </header>
//       </div>
//     );
//   }
// }

// function App() {
//   return (
//     <div>
//       <Welcome name={user} />
//     </div>
//   ); 
// }
  
// function tick() {
  // const element = (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <h1>Hello, {formatName(user)}!</h1>
  //       <h2>It is {new Date().toLocaleTimeString()}.</h2>
  //     </header>
  //   </div>
  // );

//   const element = <Welcome name={user} />;

//   ReactDOM.render(<App />, document.getElementById('root'));
// }

// setInterval(tick,1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// function Comment(props) {
//   return(
//     <div>
//       <UserInfo user={props.author} />
//       <div>
//         {props.text}
//       </div>
//       <div>
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }

// function Avatar(props) {
//   return (
//     <img
//       src={props.user.avatarUrl}
//       alt={props.user.name}
//     />
//   );
// }

// function UserInfo(props) {
//   return (
//     <div>
//       <Avatar user={props.user}/>
//       <div>
//         {props.user.name}
//       </div>
//     </div>
//   );
// }



// function Clock(props) {
//   return (
//     <div>
//       <h1>Hello, World!</h1>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }