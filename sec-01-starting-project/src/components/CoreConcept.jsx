export default function CoreConcept({image, title, description="You know who I am"}){
  return (<li>
    <img src={image} alt={title} />
<h3>{title}</h3>
<p>{description}</p>
  </li>)
}

// function CoreConcepts( {...concept} ) {  //spread: {...concept}
//   const { title, description, image } = concept; //destructuring
//   return (<li>
//     <img src={image} alt={title} />
// <h3>{title}</h3>
// <p>{description}</p>
//   </li>)
// }
// the "prop" parameter is passed as concept and destructured using spread syntax
// {/* <CoreConcepts concept={CORE_CONCEPTS[4]}/> */} the component calling must be like this

//OR
// function CoreConcepts(props){
//   return (<li>
//     <img src={props.image} alt={props.title} />
// <h3>{props.title}</h3>
// <p>{props.description}</p>
//   </li>)
// }

