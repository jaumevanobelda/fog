package handler

import (
	"fmt"
	"games/repository"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GameHandler struct {
	repo_game repository.GameRepository
}

func NewGameHandler(repo_game repository.GameRepository) *GameHandler {
	return &GameHandler{repo_game}
}

func (h *GameHandler) GetGame(c *gin.Context) {
	game, err := h.repo_game.FindOne(c.Param("slug"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, game.ToMap())
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

// func CreateGame(c *gin.Context) {
// 	var game models.Game
// 	err := c.ShouldBindJSON(&game)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	database.DB.Create(&game)
// 	c.JSON(http.StatusOK, game)
// }
