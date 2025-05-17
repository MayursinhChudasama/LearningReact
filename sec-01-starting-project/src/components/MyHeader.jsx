import reactImage from "../assets/react-core-concepts.png"
const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];
function genRandomInt(max) {
  return Math.floor(Math.random() * (max));
}
export default function MyHeader(){
  const genWord = reactDescriptions[genRandomInt(reactDescriptions.length)]  
  return  <header>
  <img src={reactImage} alt="Stylized atom" />
  <h1>React Essentials</h1>
  <p>
    {genWord} React concepts you will need for almost any app you are
    going to build!
  </p>
</header>
}
 