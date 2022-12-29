import DropDownInput from "./DropDownInput";
import { Box } from "@mui/system";
import movies from "./movies";

const options = movies.map((m) => ({ label: m.film, value: m }));
function App() {
  return (
    <Box
      sx={{
        m: "20px",
        border: 1,
        width: "auto",
        height: "500px",
      }}
    >
      <DropDownInput
        sx={{ p: "20px" }}
        options={options}
        onSelect={console.log}
        label="Movies"
      />
    </Box>
  );
}

export default App;
