package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	database "reviews/config"
	"reviews/handler"
	"reviews/models"
	"reviews/repository"
	"reviews/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Archivo .env no encontrado")
	}
	if err := database.Connect(); err != nil {
		log.Fatal(err)
	}

	database.DB.AutoMigrate(&models.Review{})
	r := gin.Default()

	gameRepo := repository.NewGameRepository(database.DB)
	userRepo := repository.NewUserRepository(database.DB)
	reviewRepo := repository.NewReviewRepository(database.DB)

	reviewHandler := handler.NewReviewHandler(reviewRepo, gameRepo, userRepo)

	routes.Setup(reviewHandler, r)

	r.Run(":" + os.Getenv("PORT"))
	fmt.Println("Reviews started")
}
