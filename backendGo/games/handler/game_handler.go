package handler

import (
	"encoding/json"
	"fmt"
	"games/repository"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GameHandler struct {
	repo_game repository.GameRepository
	repo_user repository.UserRepository
}

func NewGameHandler(repo_game repository.GameRepository, repo_user repository.UserRepository) *GameHandler {
	return &GameHandler{repo_game, repo_user}
}

func (h *GameHandler) GetGame(c *gin.Context) {
	slug := c.Param("slug")
	game, err := h.repo_game.FindOne(slug)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}
	res := game.ToMap()
	developer, err := h.repo_user.FindDeveloper(game.Developer)
	if err != nil {
		fmt.Println(err)
		res["developer"] = "Desarollador no encontrado"
	} else {
		res["developer"] = developer.Username
	}

	numReviews := 0
	rating := 0

	resp, errReq := http.Get(fmt.Sprintf("http://localhost:4003/review/%s", slug))
	if errReq == nil && resp.StatusCode == http.StatusOK {
		var reviews []struct {
			Positive bool `json:"positive"`
		}

		body, _ := io.ReadAll(resp.Body)
		if errJSON := json.Unmarshal(body, &reviews); errJSON == nil {
			numReviews = len(reviews)
			if numReviews > 0 {
				positives := 0
				for _, r := range reviews {
					if r.Positive {
						positives++
					}
				}
				rating = (positives * 100) / numReviews
			}
		}
		resp.Body.Close()
	} else {
		if errReq != nil {
			fmt.Println("Error connecting to reviews service:", errReq)
		}
	}

	res["num_reviews"] = numReviews
	res["rating"] = rating

	c.JSON(http.StatusOK, res)
}

func (h *GameHandler) GetMaxPrecio(c *gin.Context) {
	maxPrecio, err := h.repo_game.GetMaxPrecio()
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, maxPrecio)
}
