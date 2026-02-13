package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"api_gateway/proxy"
	// "api_gateway/middleware"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Archivo .env no encontrado")
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// r.Use(middleware.Auth())

	gameProxy, _ := proxy.NewReverseProxy("http://localhost:4001")
	r.Any("/games/*path", func(c *gin.Context) {
		// c.Request.URL.Path = c.Param("path")
		gameProxy.ServeHTTP(c.Writer, c.Request)
	})

	r.Run(":" + os.Getenv("PORT"))
}
