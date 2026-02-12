package routes

import (
	"games/handler"

	"github.com/gin-gonic/gin"
)

func Setup(gameHandler *handler.GameHandler, categoryHandler *handler.CategoryHandler, r *gin.Engine) {
	games := r.Group("/games")
	{
		games.GET("/:slug", gameHandler.GetGame)
		games.GET("/maxPrecio", gameHandler.GetMaxPrecio)
		games.GET("/categories", categoryHandler.GetCategories)
	}
}
