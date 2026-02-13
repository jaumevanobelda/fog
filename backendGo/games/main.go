package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	database "games/config"
	"games/handler"
	"games/models"
	"games/repository"
	"games/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Archivo .env no encontrado")
	}
	if err := database.Connect(); err != nil {
		log.Fatal(err)
	}
	database.DB.AutoMigrate(&models.Game{})
	database.DB.AutoMigrate(&models.Category{})
	r := gin.Default()
	gameRepo := repository.NewGameRepository(database.DB)
	gameHandler := handler.NewGameHandler(gameRepo)
	categoryRepo := repository.NewCategoryRepository(database.DB)
	categoryHandler := handler.NewCategoryHandler(categoryRepo)
	routes.Setup(gameHandler, categoryHandler, r)
	r.Run(":" + os.Getenv("PORT"))
	fmt.Println("Games arrancado ")
}
