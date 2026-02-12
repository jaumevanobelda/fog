package handler

import (
	"games/repository"
	"net/http"
	"games/models"
	"github.com/gin-gonic/gin"
)

type CategoryHandler struct {
	repo_category repository.CategoryRepository
}

func NewCategoryHandler(repo_category repository.CategoryRepository) *CategoryHandler {
	return &CategoryHandler{repo_category}
}

func (h *CategoryHandler) GetCategories(c *gin.Context) {
	category, err := h.repo_category.FindAll()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}
	
	c.JSON(http.StatusOK, models.CategoriesToMap(category) )
}
