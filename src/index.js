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

//Componentes Controlados
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    //event bind
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  //event bind
  handleSubmit = (event) => {
    alert('Um nome foi enviado: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nome:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Enviar"/>
      </form>
    );
  }
}

//outro componente controlado (form usando textarea ao inves do input)
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      value: 'Por favor, escreva uma dissertação sobre o seu elemento DOM favorito.'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert(`Sua dissertação foi enviada ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Dissertação:
          <textarea value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Enviar"/>
      </form>
    );
  }
}

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coco'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(`Seu sabor favorito é: ${this.state.value}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Escolha seu sabor favorito:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="laranja">Laranja</option>
            <option value="limao">Limão</option>
            <option value="coco">Coco</option>
            <option value="manga">Manga</option>
          </select>
        </label>
        <input type="submit" value="Enviar"/>
      </form>
    );
  }
}

//manipulando multiplos inputs
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is Going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of Guests:
          <input 
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}

//Elevando o State

function BoilingVerdict(props) {
  if(props.celcius >= 100) {
    return <p>A água ferveria</p>
  }
  return <p>A água não feveria</p>
}

const scaleNames = {
  c: 'Celcius',
  f: 'Fahrenheit'
};

function toCelcius(fahrenheit) {
  return (fahrenheit - 32 * 5 / 9);
}

function ToFahrenheit(celcius) {
  return (celcius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  
  if(Number.isNaN(input)) {
    return ''
  }

  const output =  convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.state = {temperature: ''};
  }

  handleChange(e) {
    // this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    // const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Informe a temperatura em {scaleNames[scale]}:</legend>
        <input 
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.handleCelciusChange = this.handleCelciusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);

    this.state = {temperature: '', scale: 'c'};
  }

  handleCelciusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature =  this.state.temperature;
    const celcius = scale === 'f' ? tryConvert(temperature, toCelcius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, ToFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput 
          temperature={'100'} 
          scale="c" 
          onTemperatureChange={this.handleCelciusChange} />
        <TemperatureInput 
          temperature={'70'} 
          scale="f" 
          onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict celcius={parseFloat(celcius)} />
      </div>
    );
  }
}

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
      <NameForm />
      <EssayForm />
      <FlavorForm />
      <Reservation />
      <Calculator />
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);









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