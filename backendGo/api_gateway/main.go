package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	// "api_gateway/middleware"
	"api_gateway/middleware"
	"api_gateway/proxy"
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

	gameProxy, _ := proxy.NewReverseProxy("http://localhost:4001")
	r.Any("/games/*path", func(c *gin.Context) {
		gameProxy.ServeHTTP(c.Writer, c.Request)
	})
	// libraryProxy, _ := proxy.NewReverseProxy("http://localhost:4002")
	// r.Any("/library/*path", func(c *gin.Context) {
	// 	libraryProxy.ServeHTTP(c.Writer, c.Request)
	// })

	libraryProxy, _ := proxy.NewReverseProxy("http://localhost:4002")
	libraryGroup := r.Group("/library")
	libraryGroup.Use(middleware.JWTAuthMiddleware())
	{
		libraryGroup.Any("/*path", func(c *gin.Context) {
			libraryProxy.ServeHTTP(c.Writer, c.Request)
		})
	}

	r.Run(":" + os.Getenv("PORT"))
}
