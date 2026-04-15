package repository

import (
	"reviews/models"

	"gorm.io/gorm"
)

type ReviewRepository interface {
	Create(review *models.Review) error
	FindByGameID(gameID uint) ([]models.Review, error)
	Delete(userID uint, gameID uint) error
}

type reviewRepository struct {
	db *gorm.DB
}

func NewReviewRepository(db *gorm.DB) ReviewRepository {
	return &reviewRepository{db}
}

func (r *reviewRepository) Create(review *models.Review) error {
	return r.db.Create(review).Error
}

func (r *reviewRepository) FindByGameID(gameID uint) ([]models.Review, error) {
	var reviews []models.Review
	err := r.db.Preload("User").Where("game_id = ?", gameID).Find(&reviews).Error
	if err != nil {
		return nil, err
	}
	return reviews, nil
}

func (r *reviewRepository) Delete(userID uint, gameID uint) error {
	return r.db.Unscoped().Where("user_id = ? AND game_id = ?", userID, gameID).Delete(&models.Review{}).Error
}
