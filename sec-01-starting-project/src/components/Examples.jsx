import { EXAMPLES } from "../data.js"
import TabButton from './TabButton.jsx';
import Section from "./Section.jsx";
import { useState } from 'react';
export default function Examples(){
    const [selectedTopic, setSelectedTopic] = useState()    
  

  function handleSelect(selectedBtn){
  setSelectedTopic(selectedBtn)
    }
    let showContent = <p>Kindly select a Topic</p>
    if (selectedTopic) {
     showContent = <div id="tab-content">
          <h3>{EXAMPLES[selectedTopic].title}</h3>
          <p>{EXAMPLES[selectedTopic].description}</p>
          <pre><code>{EXAMPLES[selectedTopic].code}</code></pre>
        </div> 
    }
     return (<Section title="Examples" id="examples">          
          <menu>

         {
           ["components","jsx","props","state"].map((keyy,i)=>(
            <TabButton key={i} isSelected={selectedTopic == keyy} onSelect={()=>handleSelect(keyy)}>{keyy}</TabButton>
           ))
         }

        {/* <TabButton isSelected={selectedTopic == 'components'} onSelect={()=>handleSelect('components')}>Components</TabButton>
        <TabButton isSelected={selectedTopic == 'jsx'} onSelect={()=>handleSelect('jsx')}>JSX</TabButton>
        <TabButton isSelected={selectedTopic == 'props'} onSelect={()=>handleSelect('props')}>Props</TabButton>
        <TabButton isSelected={selectedTopic == 'state'} onSelect={()=>handleSelect('state')}>State</TabButton> */}
        
          </menu>
        {showContent}
        </Section>
        )
}