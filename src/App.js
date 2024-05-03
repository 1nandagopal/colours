import Palette from "./Palette";
import SeedColours from "./SeedColours";

function App() {
  return (
    <div>
      <Palette {...SeedColours[4]} />
    </div>
  );
}

export default App;
