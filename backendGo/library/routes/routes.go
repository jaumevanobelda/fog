package routes

import (
	"library/handler"

	"github.com/gin-gonic/gin"
)

func Setup(libraryHandler *handler.LibraryHandler, r *gin.Engine) {
	library := r.Group("/library")
	{
		library.GET("/", libraryHandler.GetLibrary)
		library.POST("/collections", libraryHandler.AddCollection)
		library.DELETE("/collections/:collectionSlug", libraryHandler.DeleteCollection)

		library.PUT("/collections/:collectionSlug", libraryHandler.AddCollectionGame)
		library.DELETE("/collections/:collectionSlug/games/:gameSlug", libraryHandler.DeleteCollectionGame)

		// r.GET("/library", libraryHandler.GetLibrary)

		// games.GET("/:slug", gameHandler.GetGame)
	}

	// collections := r.Group("/collections")
	// {
	// 	collections.GET("/", collectionHandler.GetCollections)
	// 	collections.POST("/", collectionHandler.CreateCollection)
	// 	collections.DELETE("/:collection_slug", collectionHandler.DeleteCollection)
	// 	collections.POST("/:collection_slug/game/:game_slug", collectionHandler.CreateCollectionGame)
	// 	collections.DELETE("/:collection_slug/game/:game_slug", collectionHandler.DeleteCollectionGame)
	// }
}
