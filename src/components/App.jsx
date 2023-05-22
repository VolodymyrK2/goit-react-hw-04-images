import { useState } from "react";
import css from './App.module.css'
import SearshBar from "./SearshBar/SearshBar";
import ImageGallery from "./ImageGallery/ImageGallery";
const App = () => {
  const [imageName, setImageName] = useState(''); 
    return (
      <div className={css.app}>
        <SearshBar onSubmit={setImageName} />
        <ImageGallery
          imageName={imageName}
        />
      </div>
    );
}

export default App;