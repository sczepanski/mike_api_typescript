import "./App.css";
import CatList from "./components/CatList";
import CatForm from "./components/CatForm";

const App: React.FC = () => {
  return (
    <>
      <div>
        <h1>API CAT TypeScript</h1>
        <CatForm />
        <CatList />
      </div>
    </>
  );
};

export default App;
