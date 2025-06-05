import logoImg from "../assets/logo.jpg";
export default function Header() {
  return (
    <header id='main-header'>
      <div id='title'>
        <img
          src={logoImg}
          alt='A logo with dishes'
        />
        <h1>React Food App</h1>
      </div>
      <button className='text-button'>Cart(0)</button>
    </header>
  );
}
