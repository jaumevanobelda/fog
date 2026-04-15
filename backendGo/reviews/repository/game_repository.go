package repository

import (
	"reviews/models"

	"gorm.io/gorm"
)

type GameRepository interface {
	FindBySlug(slug string) (*models.Game, error)
}

type gameRepository struct {
	db *gorm.DB
}

func NewGameRepository(db *gorm.DB) GameRepository {
	return &gameRepository{db}
}

func (r *gameRepository) FindBySlug(slug string) (*models.Game, error) {
	var game models.Game
	err := r.db.Where("slug = ?", slug).First(&game).Error
	if err != nil {
		return nil, err
	}
	return &game, nil
}
