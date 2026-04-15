package handler

import (
	"fmt"
	"net/http"
	"strconv"

	"reviews/models"
	"reviews/repository"

	"github.com/gin-gonic/gin"
)

type ReviewHandler struct {
	reviewRepo repository.ReviewRepository
	gameRepo   repository.GameRepository
	userRepo   repository.UserRepository
}

func NewReviewHandler(rr repository.ReviewRepository, gr repository.GameRepository, ur repository.UserRepository) *ReviewHandler {
	return &ReviewHandler{
		reviewRepo: rr,
		gameRepo:   gr,
		userRepo:   ur,
	}
}

type createReviewRequest struct {
	Text     string `json:"text" binding:"required"`
	Positive bool   `json:"positive"`
}

func (h *ReviewHandler) CreateReview(c *gin.Context) {

	userId, err := strconv.ParseUint(c.GetHeader("User-Id"), 10, 32)
	if err != nil {
		fmt.Println("Error parsing User-Id:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User-Id format"})
		return
	}

	var req createReviewRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	game, err := h.gameRepo.FindBySlug(c.Param("slug"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Game not found"})
		return
	}

	newReview := models.Review{
		UserID:   uint(userId),
		GameID:   game.ID,
		Positive: req.Positive,
		Text:     req.Text,
	}

	if err := h.reviewRepo.Create(&newReview); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create review"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"slug": c.Param("slug"), "message": "Reseña Creada"})
}
func (h *ReviewHandler) GetReviews(c *gin.Context) {

	game, err := h.gameRepo.FindBySlug(c.Param("slug"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Game not found"})
		return
	}

	reviews, err := h.reviewRepo.FindByGameID(game.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch reviews"})
		return
	}

	var response []gin.H
	for _, review := range reviews {
		response = append(response, gin.H{
			"text":     review.Text,
			"positive": review.Positive,
			"user": gin.H{
				"username": review.User.Username,
				"image":    review.User.Foto,
			},
		})
	}

	if response == nil {
		response = []gin.H{}
	}

	c.JSON(http.StatusOK, response)
}

func (h *ReviewHandler) DeleteReview(c *gin.Context) {
	userId, err := strconv.ParseUint(c.GetHeader("User-Id"), 10, 32)
	if err != nil {
		fmt.Println("Error parsing User-Id:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User-Id format"})
		return
	}

	game, err := h.gameRepo.FindBySlug(c.Param("slug"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Game not found"})
		return
	}

	if err := h.reviewRepo.Delete(uint(userId), game.ID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete review"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reseña borrada", "slug": c.Param("slug")})
}
