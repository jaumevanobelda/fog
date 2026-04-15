package routes

import (
	"reviews/handler"

	"github.com/gin-gonic/gin"
)

func Setup(reviewHandler *handler.ReviewHandler, r *gin.Engine) {
	reviewGroup := r.Group("/review")
	{
		reviewGroup.POST("/:slug", reviewHandler.CreateReview)
		reviewGroup.GET("/:slug", reviewHandler.GetReviews)
		reviewGroup.DELETE("/:slug", reviewHandler.DeleteReview)

	}
}
