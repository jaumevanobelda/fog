package handler

import (
	"fmt"
	"games/repository"
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
	game, err := h.repo_game.FindOne(c.Param("slug"))
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
