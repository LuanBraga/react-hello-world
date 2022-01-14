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

//other component

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    // this.handeClick = this.handeClick.bind(this);
  }

  // handeClick() {
    // sintaxe experimental de campos de classe pública
  handeClick = () => {
    this.setState(prevState => ({isToggleOn: !prevState.isToggleOn}))
  }

  render() {
    return (
      // <button onClick={() => this.handleClick()}>
      <button onClick={this.handeClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

//statefull component
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    // this.handleLoginClick = this.handleLoginClick.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick = () => {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick = () => {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if(isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick}/>;
    }else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}

        {/* if-Else inline com operador condicional */}
        <div>
          The user is<b>{isLoggedIn ? ' currently' : ' not'}</b> logged in.
        </div>
      </div>
    );
  }
}

//Variáveis de elemento
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

//renderização condicional

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  if(isLoggedIn){
    return <UserGreeting/>
  }
  return <GuestGreeting/>
}

//if inline &&
function MailBox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello !</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You Have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

// const messages = [];
const messages = ['React', 'Re: React', 'Re:Re: React'];

//Evitando que um componente seja renderizado
function WarningBanner(props) {
  if(!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'hide' : 'Show'}
        </button>
      </div>
    );
  }
}

//renderizando multiplos componentes

const numbers = [1,2,3,4,5,6];
const listNumbers = numbers.map(number => <li key={number.toString()}>{number}</li>);

//por via de regra, os elementos dentro de uma função map() devem especificar chaves

//componente de lista básico
function NumberList(props) {
  const numbers = props.numbers
  const listNumbers = numbers.map(number => <li key={number.toString()}>{number}</li>);

  return (
    <ul>{listNumbers}</ul>
  );
}

function Blog(props) {

  const sidebar = (
    <ul>
      {props.posts.map((post) => 
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );

  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  return (
    <div>
      {sidebar}
      <hr/>
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm'},
];

const leters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','z'];

function ListItem(props) {
  return (
    <li>
      {props.value}
    </li>
  );
}

function LetersList(props) {
  const leters = props.leters;

  // const listItens = leters.map(leter =>
  //   <ListItem key={leter.toString()} value={leter}/>
  // );

  // return (
  //   <ul>
  //     {listItens}
  //   </ul>
  // );

  //incluindo map() no JSX
  return(
    <ul>
      {
        leters.map((leter) => 
        <ListItem key={leter.toString()} value={leter}/>
        )
      }
    </ul>
  );
}

// function ListItem(props) {
//   return <li>{props.value}</li>;
// }

// function NumberList2(props) {
//   const numbers = props.numbers;
//   const listItens = numbers.map((number) => 
//     <ListItem key={number.toString()}
//     value={number}/>
//   );

//   return (
//     <ul>
//       {listItens}
//     </ul>
//   );
// }

function App() {
  return (
    <div>
      <Clock/>
      <Form/>
      <Toggle/>
      <LoginControl/>
      <MailBox unreadMessages={messages} />
      <Page/>
      <ul>{listNumbers}</ul>
      <NumberList numbers={numbers} />
      <Blog posts={posts}/>
      <LetersList leters={leters} />
      {/* <NumberList2 numbers={numbers} /> */}
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