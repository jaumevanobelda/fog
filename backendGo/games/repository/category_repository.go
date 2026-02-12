package repository

import (
	"games/models"

	"gorm.io/gorm"
)

type CategoryRepository interface {
	FindAll() ([]models.Category, error)
}

type categoryRepo struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepo{db}
}

func (r *categoryRepo) FindAll() ([]models.Category, error) {
	var categories []models.Category
	if err := r.db.Unscoped().Where("IsActive = ?", true).Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}
