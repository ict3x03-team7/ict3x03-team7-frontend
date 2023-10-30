import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SearchRecipeResults() {
  const gridItemStyle = {
    padding: "16px",
  };

  // get recipe results
  const location = useLocation();
  const searchURL = location.state.searchURL;

  let getSearchText = location.state.getSearchText;

  // State to track which recipe is clicked and open the modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Function to handle opening the modal
  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Function to check if the user has scrolled down enough to show the button
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  };

  const [searchText, setSearchText] = useState("");
  const [searchTextError, setSearchTextError] = useState("");

  let navigate = useNavigate();

  const handleSearchTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= 100) {
      setSearchText(text);
      setSearchTextError("");
    } else {
      setSearchTextError("Search text should not exceed 100 characters");
    }
  };

  const gotoSearchRecipeResults = () => {
    // Check if the search text is empty
    if (!searchText) {
      setSearchTextError("Search text cannot be empty");
    } else if (searchText.length <= 100) {
      // Split the searchText by commas
      const ingredients = searchText
        .split(",")
        .map((ingredient) => `ingredients=${ingredient.trim()}`);

      let searchURL = "";

      if (ingredients.length === 1) {
        // If there's only one ingredient, don't split, just use it as is
        searchURL = `http://localhost:8085/api/v1/recipe/search?${ingredients[0]}`;
      } else {
        // Join the formatted ingredients with '&'
        const ingredientsString = ingredients.join("&");
        // Construct the URL
        searchURL = `http://localhost:8085/api/v1/recipe/search?${ingredientsString}`;
      }

      getSearchText = searchText;

      axios
        .get(searchURL, {
          withCredentials: true,
        })
        .then((response) => {
          // Set the state variable with the received data
          setRecipes(response.data.result);

          // Check if recipes are empty
          if (response.data.result.length === 0) {
            setSearchTextError(
              "No recipes found. Please try different ingredients."
            );
          } else {
            setSearchTextError("");
          }

          navigate("/SearchRecipeResults", {
            state: { searchURL, getSearchText },
          });

          setSearchText("");
        })
        .catch((error) => {
          console.error("Error fetching data");
        });
    }
  };

  // show recipe in the grids
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios
      .get(searchURL, {
        withCredentials: true,
      })
      .then((response) => {
        setRecipes(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching data:");
      });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "100px" }}>
        <h1 style={{ textAlign: "center" }}>Search A Recipe</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormControl
            sx={{ width: "100%" }}
            size="small"
            style={{ marginRight: "15px" }}
          >
            <OutlinedInput
              id="optCode"
              type="text"
              fullWidth
              variant="outlined"
              placeholder="Search a recipe here"
              sx={{ marginRight: 1 }}
              value={searchText}
              onChange={handleSearchTextChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton aria-label="opt code icon">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={gotoSearchRecipeResults}
          >
            Search
          </Button>
        </div>
        {searchTextError && (
          <Alert severity="error" style={{ marginTop: "5px" }}>
            {searchTextError}
          </Alert>
        )}
      </div>
      <div style={{ marginBottom: "100px" }}>
        <h1 style={{ textAlign: "left", marginBottom: "40px" }}>
          Your Search Results: {getSearchText}
        </h1>

        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {recipes.map((recipe, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={index}
              style={{
                ...gridItemStyle,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Paper
                elevation={3}
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <img
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                  style={{ width: "100%" }}
                />
                <Grid
                  item
                  xs
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    flex: 1,
                  }}
                >
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {recipe.recipeName}
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    Meal Type: {recipe.mealType}
                  </Typography>

                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => handleOpenModal(recipe)}
                    style={{ marginTop: "auto" }}
                  >
                    View Recipe
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Recipe Modal */}
      {selectedRecipe ? (
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>{selectedRecipe.recipeName}</DialogTitle>
          <DialogContent>
            <img
              src={selectedRecipe.recipeImage}
              alt={selectedRecipe.recipeName}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <Typography variant="h5">{selectedRecipe.recipeName}</Typography>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginTop: "15px", marginBottom: "35px" }}>
                <Typography variant="body1">
                  Calories: {Math.floor(selectedRecipe.calories)}
                </Typography>
                <Typography variant="body1">
                  Serving Size: {selectedRecipe.serving}
                </Typography>
                <Typography variant="body1">
                  Meal Type: {selectedRecipe.mealType}
                </Typography>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div
                style={{
                  backgroundColor: "#ADD8E6",
                  width: "30%",
                  height: "50px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  style={{ fontSize: "26px", fontWeight: "bold" }}
                >
                  {selectedRecipe.cuisineType}
                </Typography>
              </div>
              <div></div>
            </div>

            <Typography variant="h6" style={{ marginBottom: "15px" }}>
              Ingredients
            </Typography>

            {selectedRecipe.ingredients.map((ingredient, index) => (
              <div>
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={ingredient.image}
                    alt={ingredient.text}
                    style={{
                      width: "8%",
                      marginBottom: "16px",
                      marginTop: "10px",
                      marginRight: "30px",
                    }}
                  />
                  <Typography variant="body1">{ingredient.text}</Typography>
                </div>
                <hr style={{ borderColor: "#fafafa", borderWidth: "1px" }} />
              </div>
            ))}

            <Typography
              variant="h6"
              style={{ marginTop: "30px", marginBottom: "5px" }}
            >
              View Full Recipe Here:
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              <a
                href={selectedRecipe.sourceURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedRecipe.sourceURL}
              </a>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

      {/* Scroll to top button */}
      {showScrollButton && (
        <Button
          variant="contained"
          onClick={scrollToTop}
          style={{
            backgroundColor: "grey",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <ArrowUpwardIcon />
        </Button>
      )}
    </div>
  );
}

export default SearchRecipeResults;
