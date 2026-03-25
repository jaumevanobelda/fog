package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	database "library/config"
	"library/handler"
	"library/models"
	"library/repository"
	"library/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Archivo .env no encontrado")
	}
	if err := database.Connect(); err != nil {
		log.Fatal(err)
	}

	database.DB.AutoMigrate(&models.UserCollection{})
	database.DB.AutoMigrate(&models.CollectionGame{})
	r := gin.Default()

	libraryRepo := repository.NewLibraryRepository(database.DB)
	collectionRepo := repository.NewCollectionRepository(database.DB)

	libraryHandler := handler.NewLibraryHandler(collectionRepo, libraryRepo)

	routes.Setup(libraryHandler, r)

	r.Run(":" + os.Getenv("PORT"))
	fmt.Println("Library arrancado")
}
