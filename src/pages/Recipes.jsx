import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import food1 from "../assets/recipe/food1.jpg";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

function Recipes() {
  const recipeData = [
    {
      id: 1,
      name: "Recipe 1",
      imageUrl: food1,
      ingredients: ["Tomato", "Onion", "Garlic"],
    },
    {
      id: 2,
      name: "Recipe 2",
      imageUrl: food1,
      ingredients: ["Chicken", "Rice", "Broccoli"],
    },
    {
      id: 3,
      name: "Recipe 3",
      imageUrl: food1,
      ingredients: ["Beef", "Potatoes", "Carrots"],
    },
    {
      id: 4,
      name: "Recipe 4",
      imageUrl: food1,
      ingredients: ["Tomato", "Onion", "Garlic"],
    },
    {
      id: 5,
      name: "Recipe 5",
      imageUrl: food1,
      ingredients: ["Chicken", "Rice", "Broccoli"],
    },
    {
      id: 6,
      name: "Recipe 6",
      imageUrl: food1,
      ingredients: ["Beef", "Potatoes", "Carrots"],
    },
    // Add more recipe data as needed
  ];

  const gridItemStyle = {
    padding: "16px",
  };

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

  const [searchText, setsearchText] = useState("");
  const [searchTextError, setsearchTextError] = useState("");

  let navigate = useNavigate();
  const gotoSearchRecipeResults = () => {
    // Check if the search text is empty
    if (!searchText) {
      setsearchTextError("Search text cannot be empty");
    } else {
      // Proceed with verification logic here...
      navigate("/SearchRecipeResults");
    }
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
              onChange={(e) => setsearchText(e.target.value)}
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
          Recommended For You
        </h1>

        <Grid container spacing={2}>
          {recipeData.map((recipe) => (
            <Grid item xs={12} sm={4} key={recipe.id} style={gridItemStyle}>
              <Paper elevation={3}>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  style={{ width: "100%" }}
                />
                <Grid
                  item
                  xs
                  container
                  direction="column"
                  spacing={2}
                  style={{ padding: "20px" }}
                >
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      {recipe.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Lunch / Dinner
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={() => handleOpenModal(recipe)}
                    >
                      View Recipe
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Recipe Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        {selectedRecipe && (
          <>
            <DialogTitle>{selectedRecipe.name}</DialogTitle>
            <DialogContent>
              {/* Display the image */}
              <img
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.name}
                style={{ width: "100%", marginBottom: "16px" }}
              />
              <Typography variant="h5">{selectedRecipe.name}</Typography>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ marginTop: "15px", marginBottom: "35px" }}>
                  <Typography variant="body2">Calories: 2047 </Typography>
                  <Typography variant="body2">Serving Size: 10</Typography>
                  <Typography variant="body2">
                    Meal Type: Lunch / Dinner
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
                    Italian
                  </Typography>
                </div>
                <div></div>
              </div>

              <Typography variant="h6" style={{ marginBottom: "15px" }}>
                Ingredients
              </Typography>

              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={selectedRecipe.imageUrl}
                  alt={selectedRecipe.name}
                  style={{
                    width: "8%",
                    marginBottom: "16px",
                    marginTop: "10px",
                    marginRight: "30px",
                  }}
                />
                <Typography variant="body2">Potato</Typography>
              </div>
              <hr />
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={selectedRecipe.imageUrl}
                  alt={selectedRecipe.name}
                  style={{
                    width: "8%",
                    marginBottom: "16px",
                    marginTop: "10px",
                    marginRight: "30px",
                  }}
                />
                <Typography variant="body2">Potato</Typography>
              </div>
              <hr />
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={selectedRecipe.imageUrl}
                  alt={selectedRecipe.name}
                  style={{
                    width: "8%",
                    marginBottom: "16px",
                    marginTop: "10px",
                    marginRight: "30px",
                  }}
                />
                <Typography variant="body2">Potato</Typography>
              </div>

              {/* {selectedRecipe.ingredients.map((ingredient, index) => (
                <Typography variant="body2" key={index}>
                  {ingredient}
                </Typography>
              ))} */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

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
          <ArrowUpwardIcon /> {/* Replace text with the ArrowUpward icon */}
        </Button>
      )}
    </div>
  );
}

export default Recipes;
